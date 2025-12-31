from flask import Blueprint, request, jsonify
from src.database import users_collection, resumes_collection, settings_collection
from src.middleware.auth import admin_required
from bson import ObjectId
import datetime
from collections import Counter

admin_bp = Blueprint('admin', __name__)

def get_system_settings():
    settings = settings_collection.find_one({'type': 'global_config'})
    if not settings:
        # Default settings if none exist
        settings = {
            'type': 'global_config',
            'default_download_limit': 5,
            'default_template_limit': 10,
            'limits': {
                'knowledge_hub': 10,
                'guest': 10,
                'standard': 5
            },
            'downloads_enabled': True,
            'maintenance_mode': False,
            'updated_at': datetime.datetime.utcnow()
        }
        settings_collection.insert_one(settings)
    return settings

@admin_bp.route('/stats', methods=['GET'])
@admin_required
def get_stats(current_user):
    total_users = users_collection.count_documents({})
    total_resumes = resumes_collection.count_documents({})
    
    resumes = list(resumes_collection.find({}, {'download_count': 1}))
    total_downloads = sum(r.get('download_count', 0) for r in resumes)
    
    avg_downloads = round(total_downloads / total_users, 2) if total_users > 0 else 0
    
    # Simple active users logic: users who registered in last 30 days
    thirty_days_ago = datetime.datetime.utcnow() - datetime.timedelta(days=30)
    active_users = users_collection.count_documents({'created_at': {'$gte': thirty_days_ago}})
    
    return jsonify({
        'total_users': total_users,
        'total_resumes': total_resumes,
        'total_downloads': total_downloads,
        'active_users': active_users,
        'avg_downloads_per_user': avg_downloads
    }), 200

@admin_bp.route('/users', methods=['GET'])
@admin_required
def get_all_users(current_user):
    users = list(users_collection.find({}, {'password': 0}))
    user_list = []
    
    for user in users:
        user_id = str(user['_id'])
        user_resumes = list(resumes_collection.find({'user_id': user_id}))
        resumes_created = len(user_resumes)
        downloads_used = sum(r.get('download_count', 0) for r in user_resumes)
        
        user_list.append({
            'id': user_id,
            'name': user.get('name'),
            'email': user.get('email'),
            'role': user.get('role', 'user'),
            'created_at': user.get('created_at').isoformat() if isinstance(user.get('created_at'), datetime.datetime) else user.get('created_at'),
            'resumes_created': resumes_created,
            'downloads_used': downloads_used,
            'download_limit': user.get('download_limit', 5),
            'template_limit': user.get('template_limit', 10),
            'status': user.get('status', 'active'), # active or disabled
            'type': user.get('type', 'standard'), # standard, quest, knowledge_hub (placeholder)
            'subscription_plan': user.get('subscription_plan', 'basic') # basic, standard, enterprise, premium
        })
        
    return jsonify({'users': user_list}), 200

@admin_bp.route('/users/<user_id>', methods=['POST'])
@admin_required
def update_user_status(current_user, user_id):
    data = request.get_json()
    update_data = {}
    
    if 'download_limit' in data:
        update_data['download_limit'] = data['download_limit']
    if 'template_limit' in data:
        update_data['template_limit'] = data['template_limit']
    if 'status' in data:
        update_data['status'] = data['status']
        
    if not update_data:
        return jsonify({'message': 'No data to update'}), 400
        
    if user_id != 'admin_hardcoded':
        users_collection.update_one(
            {'_id': ObjectId(user_id)},
            {'$set': update_data}
        )
    
    return jsonify({'message': 'User updated successfully'}), 200

@admin_bp.route('/users/bulk-update', methods=['POST'])
@admin_required
def bulk_update_users(current_user):
    data = request.get_json()
    user_type = data.get('user_type')
    update_data = data.get('update_data')
    
    if not user_type or not update_data:
        return jsonify({'message': 'Missing user_type or update_data'}), 400
        
    query = {}
    if user_type != 'all':
        if user_type == 'guest':
            # Guest users (website signups) don't have a 'type' field or it's not 'knowledge_hub'
            query['type'] = {'$ne': 'knowledge_hub'}
        else:
            query['type'] = user_type
        
    subscription_plan = data.get('subscription_plan')
    if subscription_plan:
        query['subscription_plan'] = subscription_plan
        
    result = users_collection.update_many(
        query,
        {'$set': update_data}
    )
    
    return jsonify({
        'message': f'Updated {result.modified_count} users',
        'modified_count': result.modified_count
    }), 200

@admin_bp.route('/analytics/resume-trends', methods=['GET'])
@admin_required
def get_resume_trends(current_user):
    # Fetch all resumes with created_at
    resumes = list(resumes_collection.find({}, {'created_at': 1}))
    
    dates = []
    for r in resumes:
        if isinstance(r.get('created_at'), datetime.datetime):
            dates.append(r['created_at'].strftime('%Y-%m-%d'))
        elif isinstance(r.get('created_at'), str):
            # Try parsing ISO format if string
            try:
                dates.append(r['created_at'][:10])
            except:
                pass
                
    trends = Counter(dates)
    # Sort by date
    sorted_trends = [{'date': d, 'count': c} for d, c in sorted(trends.items())][-15:] # Last 15 days
    
    return jsonify({'trends': sorted_trends}), 200

@admin_bp.route('/analytics/templates', methods=['GET'])
@admin_required
def get_template_analytics(current_user):
    pipeline = [
        {"$group": {"_id": "$selectedTemplate", "usage_count": {"$sum": 1}}},
        {"$sort": {"usage_count": -1}}
    ]
    template_usage = list(resumes_collection.aggregate(pipeline))
    return jsonify({'template_usage': template_usage}), 200

@admin_bp.route('/settings', methods=['GET', 'POST'])
@admin_required
def manage_settings(current_user):
    if request.method == 'GET':
        settings = get_system_settings()
        if '_id' in settings: del settings['_id']
        return jsonify(settings), 200
    
    data = request.get_json()
    update_fields = {
        'default_download_limit': data.get('default_download_limit', 5),
        'default_template_limit': data.get('default_template_limit', 10),
        'downloads_enabled': data.get('downloads_enabled', True),
        'maintenance_mode': data.get('maintenance_mode', False),
        'updated_at': datetime.datetime.utcnow()
    }
    
    settings_collection.update_one(
        {'type': 'global_config'},
        {'$set': update_fields},
        upsert=True
    )
    
    return jsonify({'message': 'Settings updated successfully'}), 200
