"""
Enhanced security middleware for production deployment
"""
import time
from collections import defaultdict
from typing import Dict, Optional, Tuple
from fastapi import Request, HTTPException, status
from fastapi.responses import JSONResponse
import logging
import ipaddress
import re

from config import settings

logger = logging.getLogger(__name__)

class InMemoryRateLimiter:
    """
    Enhanced in-memory rate limiter with production optimizations
    Note: For production scaling, consider Redis-based rate limiting
    """
    
    def __init__(self):
        self.clients: Dict[str, Dict] = defaultdict(lambda: {
            "requests": [],
            "blocked_until": 0,
            "total_requests": 0
        })
        self.cleanup_interval = 300  # Clean up every 5 minutes
        self.last_cleanup = time.time()
        self.blocked_ips = set()  # Track permanently blocked IPs
    
    def _cleanup_old_entries(self):
        """Remove old entries and optimize memory usage"""
        current_time = time.time()
        if current_time - self.last_cleanup > self.cleanup_interval:
            cutoff_time = current_time - settings.RATE_LIMIT_WINDOW
            
            for client_ip in list(self.clients.keys()):
                client_data = self.clients[client_ip]
                # Remove old requests
                client_data["requests"] = [
                    req_time for req_time in client_data["requests"] 
                    if req_time > cutoff_time
                ]
                
                # Remove inactive clients
                if not client_data["requests"] and client_data["blocked_until"] < current_time:
                    if client_data["total_requests"] < 100:  # Keep high-volume IPs
                        del self.clients[client_ip]
            
            self.last_cleanup = current_time
            logger.info(f"Rate limiter cleanup completed. Active clients: {len(self.clients)}")
    
    def is_rate_limited(self, client_ip: str) -> Tuple[bool, Optional[int]]:
        """Check if client is rate limited and return remaining time"""
        current_time = time.time()
        
        # Check if IP is permanently blocked
        if client_ip in self.blocked_ips:
            return True, None
        
        self._cleanup_old_entries()
        
        client_data = self.clients[client_ip]
        
        # Check if currently blocked
        if client_data["blocked_until"] > current_time:
            remaining = int(client_data["blocked_until"] - current_time)
            return True, remaining
        
        # Count recent requests
        cutoff_time = current_time - settings.RATE_LIMIT_WINDOW
        recent_requests = [
            req_time for req_time in client_data["requests"] 
            if req_time > cutoff_time
        ]
        client_data["requests"] = recent_requests
        
        # Check rate limit
        if len(recent_requests) >= settings.RATE_LIMIT_REQUESTS:
            # Progressive blocking: longer blocks for repeat offenders
            block_duration = min(3600, 300 * (client_data["total_requests"] // 50 + 1))
            client_data["blocked_until"] = current_time + block_duration
            
            # Permanently block after too many violations
            if client_data["total_requests"] > 1000:
                self.blocked_ips.add(client_ip)
                logger.warning(f"IP {client_ip} permanently blocked for excessive requests")
            
            return True, block_duration
        
        return False, None
    
    def record_request(self, client_ip: str):
        """Record a new request for the client"""
        current_time = time.time()
        client_data = self.clients[client_ip]
        client_data["requests"].append(current_time)
        client_data["total_requests"] += 1

# Global rate limiter instance
rate_limiter = InMemoryRateLimiter()

def get_client_ip(request: Request) -> str:
    """Extract client IP address from request with security considerations"""
    # Check for forwarded headers (for reverse proxies)
    forwarded_for = request.headers.get("X-Forwarded-For")
    if forwarded_for:
        # Take the first IP (original client)
        ip = forwarded_for.split(",")[0].strip()
        # Validate IP format
        try:
            ipaddress.ip_address(ip)
            return ip
        except ValueError:
            pass
    
    # Check other proxy headers
    real_ip = request.headers.get("X-Real-IP")
    if real_ip:
        try:
            ipaddress.ip_address(real_ip)
            return real_ip
        except ValueError:
            pass
    
    # Fallback to direct connection
    return request.client.host if request.client else "unknown"

def validate_request_headers(request: Request) -> bool:
    """Validate request headers for security"""
    # Check Content-Type for POST requests
    if request.method == "POST":
        content_type = request.headers.get("Content-Type", "")
        if not content_type.startswith("application/json"):
            return False
    
    # Check for suspicious headers
    user_agent = request.headers.get("User-Agent", "")
    if not user_agent or len(user_agent) < 10:
        return False
    
    # Block common bot patterns
    suspicious_patterns = [
        r"bot|crawler|spider|scraper",
        r"curl|wget|python-requests",
        r"test|scanner|vulnerability"
    ]
    
    for pattern in suspicious_patterns:
        if re.search(pattern, user_agent, re.IGNORECASE):
            if not settings.DEBUG:  # Allow in development
                return False
    
    return True

async def rate_limit_middleware(request: Request, call_next):
    """Rate limiting middleware with enhanced security"""
    client_ip = get_client_ip(request)
    
    # Skip rate limiting for health checks
    if request.url.path == "/health":
        return await call_next(request)
    
    # Check rate limit
    is_limited, remaining_time = rate_limiter.is_rate_limited(client_ip)
    
    if is_limited:
        if remaining_time:
            message = f"Trop de tentatives. Réessayez dans {remaining_time} secondes."
        else:
            message = "Accès bloqué."
        
        logger.warning(f"Rate limit exceeded for {client_ip} on {request.url.path}")
        return JSONResponse(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            content={"detail": message},
            headers={"Retry-After": str(remaining_time or 3600)}
        )
    
    # Record the request
    rate_limiter.record_request(client_ip)
    
    # Add request tracking
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    
    # Add performance headers
    response.headers["X-Process-Time"] = str(round(process_time * 1000, 2))
    
    return response

async def security_headers_middleware(request: Request, call_next):
    """Add security headers to all responses"""
    response = await call_next(request)
    
    # Security headers
    security_headers = {
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "DENY",
        "X-XSS-Protection": "1; mode=block",
        "Referrer-Policy": "strict-origin-when-cross-origin",
        "X-Permitted-Cross-Domain-Policies": "none",
        "X-Download-Options": "noopen",
    }
    
    # Add HSTS in production
    if settings.is_production:
        security_headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
    
    # CSP header
    csp_directives = [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline'",
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self' data: https:",
        "font-src 'self'",
        "connect-src 'self'",
        "frame-ancestors 'none'",
        "base-uri 'self'",
        "form-action 'self'"
    ]
    
    if not settings.is_production:
        # Allow development tools
        csp_directives[1] = "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
        csp_directives.append("connect-src 'self' http://localhost:* ws://localhost:*")
    
    security_headers["Content-Security-Policy"] = "; ".join(csp_directives)
    
    # Apply headers
    for header, value in security_headers.items():
        response.headers[header] = value
    
    return response
