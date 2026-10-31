from functools import lru_cache
from typing import List, Union
from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict
import json


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=(".env", "../.env"),
        env_file_encoding="utf-8",
        extra="ignore"
    )

    # Application & Environment
    APP_NAME: str = "Subscript Hub"
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    LOG_LEVEL: str = "INFO"
    TIMEZONE: str = "Asia/Kolkata"

    # Host & Port Bindings
    API_HOST: str = "0.0.0.0"
    API_PORT: int = 8000
    WEB_PORT: int = 5173

    # Database Configuration (PostgreSQL 16)
    DB_HOST: str = "localhost"
    DB_PORT: int = 5432
    DB_NAME: str = "subscript_hub"
    DB_USER: str = "postgres"
    DB_PASSWORD: str = "postgres"
    DB_POOL_SIZE: int = 10
    DB_MAX_OVERFLOW: int = 5
    DATABASE_URL: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/subscript_hub"
    DATABASE_URL_SYNC: str = "postgresql://postgres:postgres@localhost:5432/subscript_hub"

    # Security & Authentication (JWT + Argon2id)
    SECRET_KEY: str = Field(
        default="dev_secret_key_change_in_production_min_32_chars_long_entropy_seed",
        min_length=32
    )
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 15
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    COOKIE_SECURE: bool = False
    COOKIE_SAMESITE: str = "lax"

    # CORS Allowed Origins
    CORS_ORIGINS: Union[List[str], str] = [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000"
    ]

    @field_validator("CORS_ORIGINS", mode="before")
    @classmethod
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> List[str]:
        if isinstance(v, str):
            try:
                parsed = json.loads(v)
                if isinstance(parsed, list):
                    return parsed
            except Exception:
                return [i.strip() for i in v.split(",") if i.strip()]
        return v

    # Mail & Notifications
    SMTP_HOST: str = "localhost"
    SMTP_PORT: int = 1025
    SMTP_USER: str = ""
    SMTP_PASSWORD: str = ""
    SMTP_TLS: bool = False
    SMTP_SSL: bool = False
    EMAIL_FROM: str = "Brightloop Software <billing@brightloop.io>"
    NOTIFICATION_MAX_ATTEMPTS: int = 5

    # Billing Engine & Worker Schedules
    BILLING_CRON_SCHEDULE: str = "0 2 * * *"
    LIFECYCLE_SWEEP_CRON: str = "0 1 * * *"
    OVERDUE_REMINDERS_CRON: str = "0 9 * * *"
    NOTIFICATION_DISPATCH_SECONDS: int = 60
    DEFAULT_PAYMENT_TERMS_DAYS: int = 15
    DEFAULT_VALIDITY_DAYS: int = 30
    AUTO_CONFIRM_INVOICES: bool = False
    AUTO_PAID_ZERO_INVOICES: bool = True

    # Rate Limiting
    LOGIN_RATE_LIMIT: str = "5/15minutes"
    FORGOT_PASSWORD_RATE_LIMIT: str = "3/hour"

    # Initial Admin Seed Credentials
    SEED_ADMIN_EMAIL: str = "admin@brightloop.io"
    SEED_ADMIN_PASSWORD: str = "Admin123!Secure"
    SEED_ADMIN_NAME: str = "Brightloop Administrator"


@lru_cache()
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
