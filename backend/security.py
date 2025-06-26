"""
Security middleware and rate limiting for the FastAPI application
"""
import time
from collections import defaultdict
from typing import Dict, Optional
from fastapi import Request, HTTPException, status
from fastapi.responses import JSONResponse
import logging

logger = logging.getLogger(__name__)

class InMemoryRateLimiter:
    """
    Simple in-memory rate limiter for development.
    For production, use Redis-based rate limiting.
    """
    
    def __init__(self):
        self.clients: Dict[str, Dict] = defaultdict(lambda: {
            "requests": [],
            "blocked_until": 0
        })
        self.cleanup_interval = 300  # Clean up old entries every 5 minutes
        self.last_cleanup = time.time()
    
    def _cleanup_old_entries(self):
        """Remove old entries to prevent memory leaks"""
        current_time = time.time()
        if current_time - self.last_cleanup > self.cleanup_interval:
            cutoff_time = current_time - 3600  # Keep last hour
            for client_id in list(self.clients.keys()):
                client = self.clients[client_id]
                client["requests"] = [
                    req_time for req_time in client["requests"] 
                    if req_time > cutoff_time
                ]
                if not client["requests"] and client["blocked_until"] < current_time:
                    del self.clients[client_id]
            self.last_cleanup = current_time
    
    def is_allowed(
        self, 
        client_id: str, 
        max_requests: int = 5, 
        window_seconds: int = 300,  # 5 minutes
        block_duration: int = 900   # 15 minutes
    ) -> tuple[bool, Optional[dict]]:
        """
        Check if client is allowed to make a request
        
        Args:
            client_id: Unique identifier for the client (IP address)
            max_requests: Maximum requests allowed in the window
            window_seconds: Time window in seconds
            block_duration: How long to block after limit exceeded
        
        Returns:
            (is_allowed, rate_limit_info)
        """
        current_time = time.time()
        self._cleanup_old_entries()
        
        client = self.clients[client_id]
        
        # Check if client is currently blocked
        if client["blocked_until"] > current_time:
            remaining_block = int(client["blocked_until"] - current_time)
            return False, {
                "error": "rate_limit_exceeded",
                "message": f"Trop de tentatives. Réessayez dans {remaining_block} secondes.",
                "retry_after": remaining_block
            }
        
        # Remove old requests outside the window
        cutoff_time = current_time - window_seconds
        client["requests"] = [
            req_time for req_time in client["requests"] 
            if req_time > cutoff_time
        ]
        
        # Check if within rate limit
        if len(client["requests"]) >= max_requests:
            # Block the client
            client["blocked_until"] = current_time + block_duration
            logger.warning(f"Rate limit exceeded for client {client_id}")
            return False, {
                "error": "rate_limit_exceeded", 
                "message": f"Trop de tentatives. Réessayez dans {block_duration} secondes.",
                "retry_after": block_duration
            }
        
        # Allow the request and record it
        client["requests"].append(current_time)
        
        return True, {
            "requests_remaining": max_requests - len(client["requests"]),
            "window_reset": int(cutoff_time + window_seconds)
        }

# Global rate limiter instance
rate_limiter = InMemoryRateLimiter()

def get_client_ip(request: Request) -> str:
    """Extract client IP address from request"""
    # Check for forwarded headers (for reverse proxies)
    forwarded_for = request.headers.get("X-Forwarded-For")
    if forwarded_for:
        return forwarded_for.split(",")[0].strip()
    
    real_ip = request.headers.get("X-Real-IP")
    if real_ip:
        return real_ip
    
    # Fallback to direct client IP
    return request.client.host if request.client else "unknown"

async def rate_limit_middleware(request: Request, call_next):
    """Rate limiting middleware"""
    
    # Only apply rate limiting to the subscribe endpoint
    if request.url.path == "/api/subscribe" and request.method == "POST":
        client_ip = get_client_ip(request)
        
        is_allowed, rate_info = rate_limiter.is_allowed(
            client_id=client_ip,
            max_requests=3,  # 3 requests per 5 minutes
            window_seconds=300,  # 5 minutes
            block_duration=900   # 15 minutes block
        )
        
        if not is_allowed:
            return JSONResponse(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                content=rate_info,
                headers={
                    "Retry-After": str(rate_info.get("retry_after", 900)),
                    "X-RateLimit-Limit": "3",
                    "X-RateLimit-Window": "300"
                }
            )
        
        # Add rate limit headers to successful responses
        response = await call_next(request)
        if rate_info and "requests_remaining" in rate_info:
            response.headers["X-RateLimit-Remaining"] = str(rate_info["requests_remaining"])
            response.headers["X-RateLimit-Reset"] = str(rate_info["window_reset"])
        
        return response
    
    return await call_next(request)

def validate_request_headers(request: Request) -> bool:
    """Validate that request has appropriate headers"""
    content_type = request.headers.get("content-type", "")
    
    # For POST requests, ensure proper content type
    if request.method == "POST":
        if not content_type.startswith("application/json"):
            return False
    
    return True

async def security_headers_middleware(request: Request, call_next):
    """Add security headers to all responses"""
    response = await call_next(request)
    
    # Add security headers
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    
    # Don't cache API responses
    if request.url.path.startswith("/api/"):
        response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
        response.headers["Pragma"] = "no-cache"
        response.headers["Expires"] = "0"
    
    return response
