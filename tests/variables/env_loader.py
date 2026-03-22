from __future__ import annotations

import os
from pathlib import Path

from dotenv import load_dotenv


load_dotenv(Path(__file__).resolve().parents[2] / ".env")

APP_URL = os.getenv("APP_URL", "http://localhost:3000")
API_URL = os.getenv("API_URL", f"{APP_URL}/api")
TEST_USERNAME = os.getenv("TEST_USERNAME", "test.user@example.com")
TEST_PASSWORD = os.getenv("TEST_PASSWORD", "change-me")
CRYPTO_PRIVATE_KEY_PASSWORD = os.getenv("CRYPTO_PRIVATE_KEY_PASSWORD", "")
ENCRYPTED_USERNAME = os.getenv("ENCRYPTED_USERNAME", "")
ENCRYPTED_PASSWORD = os.getenv("ENCRYPTED_PASSWORD", "")
