from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    db_uri: str = (
        "postgresql://pgvector:pgvector@localhost:5432/pgvector?sslmode=disable"
    )

    model_config = SettingsConfigDict(
        env_file=".env", env_file_encoding="utf-8", frozen=True, extra="ignore"
    )


@lru_cache
def get_settings() -> Settings:
    return Settings()
