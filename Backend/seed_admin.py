from src.database import users_collection
from src.config import Config
import bcrypt
import datetime

def seed_admin():
    email = Config.ADMIN_EMAIL
    password = Config.ADMIN_PASSWORD
    
    # Check if admin already exists
    if users_collection.find_one({'email': email}):
        print(f"User {email} already exists.")
        return

    print(f"Creating admin user: {email}")
    
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    
    admin_user = {
        'name': 'System Admin',
        'email': email,
        'password': hashed_password,
        'role': 'admin',
        'type': 'admin',
        'subscription_plan': 'premium',
        'created_at': datetime.datetime.utcnow()
    }
    
    users_collection.insert_one(admin_user)
    print(f"Admin user created successfully!\nEmail: {email}\nPassword: {password}")

if __name__ == '__main__':
    seed_admin()
