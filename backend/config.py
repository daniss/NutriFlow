import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    """Application settings"""
    
    # Database
    DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/nutriflow_dev")
    
    # FastAPI
    DEBUG: bool = os.getenv("DEBUG", "True").lower() == "true"
    SECRET_KEY: str = os.getenv("SECRET_KEY", "your-secret-key-change-in-production")
    
    # CORS
    ALLOWED_ORIGINS: list = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")
    
    # API
    API_PREFIX: str = "/api"
    PROJECT_NAME: str = "NutriFlow API"
    VERSION: str = "1.0.0"

settings = Settings()
