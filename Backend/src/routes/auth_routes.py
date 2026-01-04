from flask import Blueprint, request, jsonify
import bcrypt
import jwt
import datetime
from src.config import Config
from src.database import users_collection, settings_collection
from src.middleware.auth import token_required

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    
    if not data or not data.get('email') or not data.get('password') or not data.get('name'):
        return jsonify({'message': 'Missing required fields!'}), 400
    
    if users_collection.find_one({'email': data['email']}):
        return jsonify({'message': 'User already exists!'}), 400
    
    hashed_password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())
    
    # Automatically assign 'admin' role if the email matches ADMIN_EMAIL
    role = 'admin' if data['email'] == Config.ADMIN_EMAIL else 'user'
    
    # Fetch global settings for default limits
    settings = settings_collection.find_one({'type': 'global_config'})
    
    # Default limits
    template_limit = 3  # Safe default if no settings
    resume_download_limit = 2 # Safe default

    if settings:
        guest_limits = settings.get('guest_limits', {})
        if guest_limits:
            template_limit = int(guest_limits.get('templates', 3))
            resume_download_limit = int(guest_limits.get('downloads', 2))
        else:
            # Fallback to older keys if guest_limits object doesn't exist
            template_limit = settings.get('default_template_limit', 3)
            resume_download_limit = settings.get('default_download_limit', 2)

    user_data = {
        'name': data['name'],
        'email': data['email'],
        'password': hashed_password,
        'role': role,
        'type': 'guest', # Standard signup is guest/standard
        'subscription_plan': 'basic',
        'template_limit': template_limit,
        'resume_download_limit': resume_download_limit,
        'download_limit': resume_download_limit, # Keep legacy limit in sync with per-resume limit
        'created_at': datetime.datetime.utcnow()
    }
    
    result = users_collection.insert_one(user_data)
    
    # Generate token
    token = jwt.encode({
        'user_id': str(result.inserted_id),
        'role': user_data['role'],
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
    }, Config.JWT_SECRET, algorithm="HS256")
    
    return jsonify({
        'message': 'User registered successfully!',
        'token': token,
        'user': {
            'name': user_data['name'],
            'email': user_data['email'],
            'role': user_data['role']
        }
    }), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({'message': 'Missing email or password!'}), 400
    
    # 1. (Removed Hardcoded Admin Check for Security)
    # To be an admin, register with the email in Config.ADMIN_EMAIL
    # or manually update your user role in the database.
    user = users_collection.find_one({'email': data['email']})
    
    if not user or not bcrypt.checkpw(data['password'].encode('utf-8'), user['password']):
        return jsonify({'message': 'Invalid credentials!'}), 401
    
    token = jwt.encode({
        'user_id': str(user['_id']),
        'role': user.get('role', 'user'),
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
    }, Config.JWT_SECRET, algorithm="HS256")
    
    return jsonify({
        'token': token,
        'user': {
            'id': str(user['_id']),
            'name': user['name'],
            'email': user['email'],
            'role': user.get('role', 'user')
        }
    }), 200

@auth_bp.route('/me', methods=['GET'])
@token_required
def get_me(current_user):
    return jsonify(current_user), 200
