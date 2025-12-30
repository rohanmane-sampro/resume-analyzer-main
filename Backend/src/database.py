from pymongo import MongoClient
from src.config import Config

class Database:
    _client = None
    _db = None

    @classmethod
    def get_db(cls):
        if cls._db is None:
            try:
                cls._client = MongoClient(Config.MONGODB_URI, serverSelectionTimeoutMS=5000)
                # Extract database name from URI or default to resume_analyzer
                db_name = Config.MONGODB_URI.split('/')[-1].split('?')[0] or 'resume_analyzer'
                cls._db = cls._client[db_name]
                # Trigger a connection attempt
                cls._client.admin.command('ping')
                print(f"✅ MongoDB Connected successfully to database: {db_name}")
            except Exception as e:
                print(f"❌ MongoDB Connection failed: {e}")
                raise e
        return cls._db

db = Database.get_db()
users_collection = db['users']
resumes_collection = db['resumes']
templates_collection = db['templates']
settings_collection = db['settings']
