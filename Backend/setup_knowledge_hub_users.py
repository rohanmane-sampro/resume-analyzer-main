"""
Knowledge Hub Test Users Setup Script
======================================

This script creates 4 test users with different subscription plans
in the MAIN application database (resume_analyzer).

Run this script to set up test users:
    python setup_knowledge_hub_users.py
"""

from pymongo import MongoClient
import bcrypt
import datetime

# MongoDB Connection
MONGO_URI = "mongodb://localhost:27017/"
client = MongoClient(MONGO_URI)

# Use MAIN application database (same as the app uses)
db = client['resume_analyzer']  # Changed from 'knowledge_hub' to 'resume_analyzer'
users_collection = db['users']
settings_collection = db['settings']

# Test Users Configuration
TEST_USERS = [
    {
        'name': 'Basic Plan User',
        'email': 'basic@knowledgehub.com',
        'password': 'Basic@123',
        'subscription_plan': 'basic',
        'type': 'knowledge_hub'
    },
    {
        'name': 'Standard Plan User',
        'email': 'standard@knowledgehub.com',
        'password': 'Standard@123',
        'subscription_plan': 'standard',
        'type': 'knowledge_hub'
    },
    {
        'name': 'Enterprise Plan User',
        'email': 'enterprise@knowledgehub.com',
        'password': 'Enterprise@123',
        'subscription_plan': 'enterprise',
        'type': 'knowledge_hub'
    },
    {
        'name': 'Premium Plan User',
        'email': 'premium@knowledgehub.com',
        'password': 'Premium@123',
        'subscription_plan': 'premium',
        'type': 'knowledge_hub'
    },
    {
        'name': 'Basic 1 Plan User',
        'email': 'basic1@knowledgehub.com',
        'password': 'Basic@123',
        'subscription_plan': 'basic',
        'type': 'knowledge_hub'
    },
    {
        'name': 'Standard 1 Plan User',
        'email': 'standard1@knowledgehub.com',
        'password': 'Standard@123',
        'subscription_plan': 'standard',
        'type': 'knowledge_hub'
    },
    {
        'name': 'Enterprise 1 Plan User',
        'email': 'enterprise1@knowledgehub.com',
        'password': 'Enterprise@123',
        'subscription_plan': 'enterprise',
        'type': 'knowledge_hub'
    },
    {
        'name': 'Premium 1Plan User',
        'email': 'premium1@knowledgehub.com',
        'password': 'Premium@123',
        'subscription_plan': 'premium',
        'type': 'knowledge_hub'
    }
]

def setup_knowledge_hub_users():
    """Create test users in the main application database"""
    
    print("=" * 60)
    print("KNOWLEDGE HUB TEST USERS SETUP")
    print("Database: resume_analyzer (main app database)")
    print("=" * 60)
    print()

    # Fetch global settings for limits
    print("Fetching system settings for limits...")
    global_settings = settings_collection.find_one({'type': 'global_config'})
    kh_limits = {}
    
    if global_settings and 'knowledge_hub_limits' in global_settings:
        kh_limits = global_settings['knowledge_hub_limits']
        print("✓ Loaded custom Knowledge Hub limits from Admin Settings")
    else:
        # Fallback defaults (Synced with Frontend ManageUsers.jsx defaults)
        kh_limits = {
            'basic': {'templates': 3, 'downloads': 2},
            'standard': {'templates': 7, 'downloads': 3},
            'enterprise': {'templates': 15, 'downloads': 4},
            'premium': {'templates': 31, 'downloads': 5}
        }
        print("! Custom limits not found, using script defaults (synced with frontend)")

    # Clear existing test users (optional)
    print("Clearing existing test users...")
    users_collection.delete_many({
        'email': {'$in': [user['email'] for user in TEST_USERS]}
    })
    print("✓ Cleared existing test users")
    print()
    
    # Create test users
    print("Creating test users...")
    print()
    
    created_users = []
    
    for user_config in TEST_USERS:
        # Hash password
        hashed_password = bcrypt.hashpw(
            user_config['password'].encode('utf-8'),
            bcrypt.gensalt()
        )
        
        # Get limits for this plan
        plan = user_config['subscription_plan'].lower()
        plan_limits = kh_limits.get(plan, {'templates': 3, 'downloads': 2}) # Default fallback
        
        t_limit = int(plan_limits.get('templates', 3))
        d_limit = int(plan_limits.get('downloads', 2))

        # Create user document
        user_doc = {
            'name': user_config['name'],
            'email': user_config['email'],
            'password': hashed_password,
            'role': 'user',
            'type': user_config['type'],
            'subscription_plan': user_config['subscription_plan'],
            'template_limit': t_limit,
            'resume_download_limit': d_limit,
            'download_limit': d_limit, # Sync legacy limit
            'status': 'active',
            'created_at': datetime.datetime.utcnow(),
            'last_login': None
        }
        
        # Insert user
        result = users_collection.insert_one(user_doc)
        
        # Store created user info
        created_users.append({
            'id': str(result.inserted_id),
            'name': user_config['name'],
            'email': user_config['email'],
            'password': user_config['password'],
            'plan': user_config['subscription_plan']
        })
        
        print(f"✓ Created: {user_config['name']} | Limits: T={t_limit}, D={d_limit}")
    
    print()
    print("=" * 60)
    print("TEST USERS CREATED SUCCESSFULLY!")
    print("=" * 60)
    print()
    
    # Print login credentials
    print("LOGIN CREDENTIALS:")
    print("-" * 60)
    print()
    
    for idx, user in enumerate(created_users, 1):
        print(f"USER {idx}: {user['plan'].upper()} PLAN")
        print(f"  Name:     {user['name']}")
        print(f"  Email:    {user['email']}")
        print(f"  Password: {user['password']}")
        print(f"  Plan:     {user['plan']}")
        print(f"  User ID:  {user['id']}")
        print()
    
    print("-" * 60)
    print()
    
    # Save credentials to file
    with open('KNOWLEDGE_HUB_CREDENTIALS.txt', 'w') as f:
        f.write("=" * 60 + "\n")
        f.write("KNOWLEDGE HUB TEST USERS - LOGIN CREDENTIALS\n")
        f.write("=" * 60 + "\n\n")
        
        for idx, user in enumerate(created_users, 1):
            f.write(f"USER {idx}: {user['plan'].upper()} PLAN\n")
            f.write(f"  Email:    {user['email']}\n")
            f.write(f"  Password: {user['password']}\n")
            f.write(f"  Plan:     {user['plan']}\n")
            f.write("\n")
    
    print("✓ Credentials saved to: KNOWLEDGE_HUB_CREDENTIALS.txt")
    print()
    
    return created_users

def verify_users():
    """Verify users were created correctly"""
    print("=" * 60)
    print("VERIFYING USERS...")
    print("=" * 60)
    print()
    
    for user_config in TEST_USERS:
        user = users_collection.find_one({'email': user_config['email']})
        if user:
            print(f"✓ {user_config['email']} - {user_config['subscription_plan']}")
        else:
            print(f"✗ {user_config['email']} - NOT FOUND")
    
    print()
    total_users = users_collection.count_documents({})
    print(f"Total users in resume_analyzer DB: {total_users}")
    print()

if __name__ == "__main__":
    try:
        # Setup users
        created_users = setup_knowledge_hub_users()
        
        # Verify
        verify_users()
        
        print("=" * 60)
        print("SETUP COMPLETE!")
        print("=" * 60)
        print()
        print("You can now login with any of the test users.")
        print("Credentials are saved in: KNOWLEDGE_HUB_CREDENTIALS.txt")
        print()
        
    except Exception as e:
        print(f"ERROR: {e}")
        import traceback
        traceback.print_exc()
