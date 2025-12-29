import jwt
import datetime
from functools import wraps
from flask import request, jsonify
from src.config import Config
from src.database import users_collection
from bson import ObjectId

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            if auth_header.startswith('Bearer '):
                token = auth_header.split(" ")[1]

        if not token:
            return jsonify({'message': 'Token is missing!'}), 401

        try:
            data = jwt.decode(token, Config.JWT_SECRET, algorithms=["HS256"])
            
            # Handle hardcoded admin
            if data.get('user_id') == 'admin_hardcoded':
                current_user = {
                    '_id': 'admin_hardcoded',
                    'name': 'System Admin',
                    'email': Config.ADMIN_EMAIL,
                    'role': 'admin'
                }
            else:
                current_user = users_collection.find_one({'_id': ObjectId(data['user_id'])})
                if not current_user:
                    return jsonify({'message': 'User not found!'}), 401
            
            # Remove password before attaching to request
            if 'password' in current_user:
                del current_user['password']
            current_user['_id'] = str(current_user['_id'])
            
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired!'}), 401
        except Exception as e:
            return jsonify({'message': 'Token is invalid!', 'error': str(e)}), 401

        return f(current_user, *args, **kwargs)

    return decorated

def admin_required(f):
    @wraps(f)
    @token_required
    def decorated(current_user, *args, **kwargs):
        if current_user.get('role') != 'admin':
            return jsonify({'message': 'Admin access required!'}), 403
        return f(current_user, *args, **kwargs)
    return decorated
