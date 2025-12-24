import os
from pathlib import Path
from dotenv import load_dotenv

# Load .env from backend root
env_path = Path(__file__).parent.parent / '.env'
load_dotenv(dotenv_path=env_path)

class Config:
    DEBUG = True
    GROQ_API_KEY = os.getenv("GROQ_API_KEY")
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
    CORS_ORIGINS = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://prashantparshuramkar.host20.uk",
        "https://nishanttech.host20.uk"
    ]
