import pytest
import os

# Set testing environment variables
os.environ["ENVIRONMENT"] = "test"
os.environ["DATABASE_URL"] = "postgresql+asyncpg://postgres:postgres@localhost:5432/subscript_hub_test"
os.environ["DATABASE_URL_SYNC"] = "postgresql://postgres:postgres@localhost:5432/subscript_hub_test"
os.environ["SECRET_KEY"] = "test_secret_key_minimum_thirty_two_chars_long_entropy_seed"


@pytest.fixture(scope="session")
def anyio_backend():
    return "asyncio"
