from flask import Blueprint, request, jsonify
from src.database import Database
import bcrypt
import jwt
import datetime
import os
from src.config import Config
from src.middleware.auth import token_required

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    if not name or not email or not password:
        return jsonify({'message': 'Missing required fields'}), 400

    db = Database.get_db()
    
    if db.users.find_one({'email': email}):
        return jsonify({'message': 'User already exists'}), 400

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    
    role = 'user'
    admin_email = os.getenv('ADMIN_EMAIL')
    if admin_email and email == admin_email:
        role = 'admin'

    user_id = db.users.insert_one({
        'name': name,
        'email': email,
        'password': hashed_password,
        'role': role,
        'created_at': datetime.datetime.utcnow()
    }).inserted_id

    return jsonify({'message': 'User created successfully', 'user_id': str(user_id)}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'message': 'Missing credentials'}), 400

    # Check hardcoded admin first (Optional, but good for bootstrapping)
    # Check hardcoded admin first (Optional, but good for bootstrapping)
    admin_email = "admin@sampro.ai"
    admin_password = "admin123"
    
    if email == admin_email and password == admin_password:
         token = jwt.encode({
            'user_id': 'admin_static_id', # Placeholder for static admin
            'role': 'admin',
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }, Config.JWT_SECRET, algorithm="HS256")
         return jsonify({'token': token, 'role': 'admin', 'name': 'Admin'}), 200

    db = Database.get_db()
    user = db.users.find_one({'email': email})

    if not user:
        return jsonify({'message': 'Invalid credentials'}), 401

    if bcrypt.checkpw(password.encode('utf-8'), user['password']):
        token = jwt.encode({
            'user_id': str(user['_id']),
            'role': user.get('role', 'user'),
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)
        }, Config.JWT_SECRET, algorithm="HS256")
        return jsonify({'token': token, 'role': user.get('role', 'user'), 'name': user.get('name')}), 200

    return jsonify({'message': 'Invalid credentials'}), 401

@auth_bp.route('/me', methods=['GET'])
@token_required
def get_current_user(current_user):
    user_data = {
        'id': str(current_user['_id']),
        'name': current_user['name'],
        'email': current_user['email'],
        'role': current_user.get('role', 'user')
    }
    return jsonify(user_data), 200
