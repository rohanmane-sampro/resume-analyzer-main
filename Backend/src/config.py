import os
from pathlib import Path
from dotenv import load_dotenv

# Define function to load .env from multiple possible locations
def load_all_envs():
    base_dir = Path(__file__).parent.parent.parent  # Project root
    backend_dir = Path(__file__).parent.parent      # Backend root
    
    print(f"DEBUG: Config looking for .env in:")
    print(f"  Root: {base_dir / '.env'}")
    print(f"  Backend: {backend_dir / '.env'}")
    
    # Try loading from project root with utf-8-sig to handle BOM
    load_dotenv(dotenv_path=base_dir / '.env', override=True, encoding='utf-8-sig')
    
    # Try loading from backend directory (overrides root if duplicates)
    load_dotenv(dotenv_path=backend_dir / '.env', override=True, encoding='utf-8-sig')
    
    # Check if key is present immediately
    key = os.getenv("GROQ_API_KEY")
    if not key:
        # Fallback: Try manual parsing if load_dotenv fails on encoding
        print("DEBUG: load_dotenv failed to set key, trying manual parse...")
        try:
            env_path = backend_dir / '.env'
            if env_path.exists():
                with open(env_path, 'r', encoding='utf-8-sig') as f:
                    for line in f:
                        if '=' in line:
                            k, v = line.strip().split('=', 1)
                            os.environ[k.strip()] = v.strip()
            key = os.getenv("GROQ_API_KEY")
        except Exception as e:
            print(f"DEBUG: Manual parse failed: {e}")

    print(f"DEBUG: Current GROQ_API_KEY value: {key[:10] if key else 'None'}...")

load_all_envs()

class Config:
    GROQ_API_KEY = os.getenv("GROQ_API_KEY")
    CORS_ORIGINS = [
        "http://localhost:5173",
        "https://prashantparshuramkar.host20.uk",
        "https://nishanttech.host20.uk"
    ]
