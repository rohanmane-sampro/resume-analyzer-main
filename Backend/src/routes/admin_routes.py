from flask import Blueprint, request, jsonify
from src.database import users_collection, resumes_collection
from src.middleware.auth import admin_required
from bson import ObjectId
import datetime

admin_bp = Blueprint('admin', __name__)

@admin_bp.route('/metrics', methods=['GET'])
@admin_required
def get_metrics(current_user):
    total_users = users_collection.count_documents({})
    total_resumes = resumes_collection.count_documents({})
    
    # Calculate total downloads across all resumes
    resumes = list(resumes_collection.find({}, {'download_count': 1}))
    total_downloads = sum(r.get('download_count', 0) for r in resumes)
    
    # Active users in last 24h (mock logic based on last register if last_login not available)
    # Since we don't have last_login yet, let's just count users created in last 7 days as 'active'
    seven_days_ago = datetime.datetime.utcnow() - datetime.timedelta(days=7)
    active_users = users_collection.count_documents({'created_at': {'$gte': seven_days_ago}})
    
    return jsonify({
        'total_users': total_users,
        'total_resumes': total_resumes,
        'total_downloads': total_downloads,
        'active_users': active_users
    }), 200

@admin_bp.route('/users', methods=['GET'])
@admin_required
def get_all_users(current_user):
    users = list(users_collection.find({}, {'password': 0}))
    user_list = []
    
    for user in users:
        user_id = str(user['_id'])
        # Get resume stats for each user
        user_resumes = list(resumes_collection.find({'user_id': user_id}))
        resumes_created = len(user_resumes)
        downloads_used = sum(r.get('download_count', 0) for r in user_resumes)
        
        user_list.append({
            'id': user_id,
            'name': user.get('name'),
            'email': user.get('email'),
            'role': user.get('role', 'user'),
            'created_at': user.get('created_at'),
            'resumes_created': resumes_created,
            'downloads_used': downloads_used,
            'download_limit': user.get('download_limit', 5) # Default limit 5
        })
        
    return jsonify({'users': user_list}), 200

@admin_bp.route('/users/<user_id>/limit', methods=['POST'])
@admin_required
def update_user_limit(current_user, user_id):
    data = request.get_json()
    new_limit = data.get('limit')
    
    if new_limit is None or not isinstance(new_limit, int):
        return jsonify({'message': 'Invalid limit value'}), 400
        
    # Special case for hardcoded admin who doesn't exist in DB
    if user_id == 'admin_hardcoded':
        return jsonify({'message': 'Hardcoded admin limit cannot be changed in DB, but stays unlimited.'}), 200
        
    users_collection.update_one(
        {'_id': ObjectId(user_id)},
        {'$set': {'download_limit': new_limit}}
    )
    
    return jsonify({'message': f'Download limit updated to {new_limit}'}), 200

@admin_bp.route('/analytics/templates', methods=['GET'])
@admin_required
def get_template_analytics(current_user):
    pipeline = [
        {"$group": {"_id": "$template_id", "usage_count": {"$sum": 1}}},
        {"$sort": {"usage_count": -1}}
    ]
    template_usage = list(resumes_collection.aggregate(pipeline))
    return jsonify({'template_usage': template_usage}), 200
