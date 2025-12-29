from pymongo import MongoClient
from src.config import Config
import os

class Database:
    client = None
    db = None

    @classmethod
    def initialize(cls):
        mongo_uri = os.getenv('MONGODB_URI', 'mongodb://localhost:27017/resume_analyzer')
        cls.client = MongoClient(mongo_uri)
        cls.db = cls.client.get_database()
        print(f"Connected to MongoDB at {mongo_uri}")

    @classmethod
    def get_db(cls):
        if cls.db is None:
            cls.initialize()
        return cls.db
