from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging

from config import settings
from database import create_tables
from api import router
from security import rate_limit_middleware, security_headers_middleware

# Configure logging
logging.basicConfig(
    level=logging.INFO if settings.DEBUG else logging.WARNING,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)

logger = logging.getLogger(__name__)

# Create FastAPI app
app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    debug=settings.DEBUG,
    docs_url="/docs" if settings.DEBUG else None,
    redoc_url="/redoc" if settings.DEBUG else None,
)

# Add security middlewares (order matters!)
app.middleware("http")(security_headers_middleware)
app.middleware("http")(rate_limit_middleware)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=False,  # Set to False for security
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type", "Accept", "Origin", "User-Agent"],  # Restrict headers
)

# Include API routes
app.include_router(router, prefix=settings.API_PREFIX)

@app.on_event("startup")
async def startup_event():
    """Create database tables on startup"""
    logger.info("Starting NutriFlow API...")
    create_tables()
    logger.info("Database tables created/verified")

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "NutriFlow API",
        "version": settings.VERSION,
        "status": "running"
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "message": "API is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.DEBUG
    )
