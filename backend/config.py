import os
import secrets
from dotenv import load_dotenv
from typing import List

load_dotenv()

class Settings:
    """Application settings with production-ready defaults"""
    
    # Database
    DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/nutriflow_dev")
    
    # FastAPI
    DEBUG: bool = os.getenv("DEBUG", "False").lower() == "true"
    SECRET_KEY: str = os.getenv("SECRET_KEY") or secrets.token_urlsafe(64)
    
    # CORS - More restrictive defaults
    ALLOWED_ORIGINS: List[str] = [
        origin.strip() 
        for origin in os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")
        if origin.strip()
    ]
    
    # API
    API_PREFIX: str = "/api"
    PROJECT_NAME: str = "NutriFlow API"
    VERSION: str = "1.0.0"
    
    # Security
    RATE_LIMIT_REQUESTS: int = int(os.getenv("RATE_LIMIT_REQUESTS", "3"))
    RATE_LIMIT_WINDOW: int = int(os.getenv("RATE_LIMIT_WINDOW", "300"))  # 5 minutes
    
    # Production settings
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development")
    
    @property
    def is_production(self) -> bool:
        return self.ENVIRONMENT == "production"
    
    @property
    def docs_url(self) -> str:
        return "/docs" if self.DEBUG and not self.is_production else None
    
    @property
    def redoc_url(self) -> str:
        return "/redoc" if self.DEBUG and not self.is_production else None

settings = Settings()
