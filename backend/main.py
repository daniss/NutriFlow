from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.responses import JSONResponse
import logging
import sys

from config import settings
from database import create_tables
from api import router
from security import rate_limit_middleware, security_headers_middleware

# Configure logging
log_level = logging.INFO if settings.DEBUG else logging.WARNING
logging.basicConfig(
    level=log_level,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    handlers=[
        logging.StreamHandler(sys.stdout),
    ] if settings.is_production else [logging.StreamHandler()]
)

logger = logging.getLogger(__name__)

# Create FastAPI app with production-safe settings
app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    debug=settings.DEBUG,
    docs_url=settings.docs_url,
    redoc_url=settings.redoc_url,
    # Hide server info in production
    openapi_url="/openapi.json" if not settings.is_production else None,
)

# Add security middlewares (order matters!)
if settings.is_production:
    # Trusted host middleware for production
    app.add_middleware(
        TrustedHostMiddleware, 
        allowed_hosts=["*.nutri-flow.me", "nutri-flow.me", "localhost"]
    )

app.middleware("http")(security_headers_middleware)
app.middleware("http")(rate_limit_middleware)

# Add CORS middleware with restrictive settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS.split(","),
    allow_credentials=False,  # Security: Keep false unless needed
    allow_methods=["GET", "POST", "OPTIONS"],  # Only needed methods
    allow_headers=["Content-Type", "Accept", "Origin", "User-Agent", "X-Requested-With"],
    expose_headers=["X-Request-ID"],  # For request tracking
)

# Include API routes
app.include_router(router, prefix=settings.API_PREFIX)

# Global exception handler for production
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """Global exception handler to prevent information leakage"""
    if settings.is_production:
        logger.error(f"Unhandled exception: {str(exc)}", exc_info=True)
        return JSONResponse(
            status_code=500,
            content={"detail": "Internal server error"}
        )
    else:
        # In development, show detailed errors
        raise exc

@app.on_event("startup")
async def startup_event():
    """Create database tables on startup"""
    logger.info(f"Starting NutriFlow API v{settings.VERSION}...")
    logger.info(f"Environment: {settings.ENVIRONMENT}")
    logger.info(f"Debug mode: {settings.DEBUG}")
    create_tables()
    logger.info("Database tables created/verified")

@app.get("/")
async def root(request: Request):
    """Root endpoint with minimal information"""
    from security import get_client_ip
    client_ip = get_client_ip(request)
    logger.info(f"Root endpoint accessed from {client_ip} - Headers: {dict(request.headers)}")
    
    return {
        "message": "NutriFlow API",
        "version": settings.VERSION,
        "status": "running"
    }

@app.get("/health")
async def health_check(request: Request):
    """Health check endpoint for monitoring"""
    from security import get_client_ip
    client_ip = get_client_ip(request)
    logger.info(f"Health check from {client_ip} - Headers: {dict(request.headers)}")
    
    return {"status": "healthy", "message": "API is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.DEBUG and not settings.is_production,
        access_log=settings.DEBUG
    )
