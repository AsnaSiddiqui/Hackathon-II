from pydantic_settings import BaseSettings
from typing import List, Optional
import os

class Settings(BaseSettings):
    PROJECT_NAME: str = "Todo API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"

    # Database
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./todo_app.db")

    # Auth
    BETTER_AUTH_SECRET: str = os.getenv("BETTER_AUTH_SECRET", "your-default-secret-change-me")
    SECRET_KEY: str = os.getenv("SECRET_KEY", "your-default-secret-key-change-me")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    # CORS
    BACKEND_CORS_ORIGINS: List[str] = ["*"]  # In production, replace with specific domains

    class Config:
        env_file = ".env"

settings = Settings()