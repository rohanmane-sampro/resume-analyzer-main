from flask import Blueprint, request, jsonify
from src.database import resumes_collection, templates_collection, users_collection
from src.middleware.auth import token_required, admin_required
import datetime
from bson import ObjectId
from src.utils.limits import get_effective_limits

resume_bp = Blueprint('resume', __name__)

@resume_bp.route('/track/create', methods=['POST'])
@token_required
def track_create(current_user):
    data = request.get_json()
    template_id = data.get('template_id')
    
    resume_data = {
        'user_id': current_user['_id'],
        'template_id': template_id,
        'metadata': data.get('metadata', {}),
        'created_at': datetime.datetime.utcnow(),
        'download_count': 0
    }
    
    result = resumes_collection.insert_one(resume_data)
    return jsonify({'message': 'Resume creation tracked', 'resume_id': str(result.inserted_id)}), 201

@resume_bp.route('/track/download/<resume_id>', methods=['POST'])
@token_required
def track_download(current_user, resume_id):
    try:
        # Increment download count for the specific resume
        resumes_collection.update_one(
            {'_id': ObjectId(resume_id), 'user_id': current_user['_id']},
            {'$inc': {'download_count': 1}}
        )

        # Increment total downloads used for the user
        users_collection.update_one(
            {'_id': ObjectId(current_user['_id'])},
            {'$inc': {'downloads_used': 1}}
        )
        
        return jsonify({'message': 'Download tracked'}), 200
        
    except Exception as e:
        print(f"Error tracking download: {e}")
        return jsonify({'error': str(e)}), 500

@resume_bp.route('/stats', methods=['GET'])
@token_required
def get_user_stats(current_user):
    resumes = list(resumes_collection.find({'user_id': current_user['_id']}))
    total_created = len(resumes)
    total_downloads = sum(r.get('download_count', 0) for r in resumes)
    
    return jsonify({
        'total_created': total_created,
        'total_downloads': total_downloads,
        'resumes': [{
            'id': str(r['_id']),
            'template_id': r.get('template_id'),
            'created_at': r.get('created_at'),
            'download_count': r.get('download_count', 0)
        } for r in resumes]
    }), 200

@resume_bp.route('/admin/stats', methods=['GET'])
@admin_required
def get_admin_stats(current_user):
    total_users = users_collection.count_documents({})
    total_resumes = resumes_collection.count_documents({})
    
    # Aggregation for top templates
    pipeline = [
        {"$group": {"_id": "$template_id", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}},
        {"$limit": 5}
    ]
    top_templates = list(resumes_collection.aggregate(pipeline))
    
    return jsonify({
        'total_users': total_users,
        'total_resumes': total_resumes,
        'top_templates': top_templates
    }), 200

# Define total available templates in the system
TOTAL_SYSTEM_TEMPLATES = 30

@resume_bp.route('/available-templates', methods=['GET'])
@token_required
def get_available_templates(current_user):
    # Admin sees all templates
    if current_user.get('role') == 'admin':
        all_templates = list(range(1, TOTAL_SYSTEM_TEMPLATES + 1))
        return jsonify({
            'is_admin': True, 
            'templates': all_templates, 
            'total': len(all_templates),
            'total_system_templates': TOTAL_SYSTEM_TEMPLATES,
            'all_templates': all_templates
        }), 200
    
    # Get user
    user_doc = users_collection.find_one({'_id': ObjectId(current_user['_id'])})
    if not user_doc:
        return jsonify({'message': 'User not found'}), 404
    
    # Get template limit
    limits = get_effective_limits(user_doc)
    template_limit = limits['template_limit']
    
    # Return sequential templates from 1
    # Ensure limit doesn't exceed total system templates
    safe_limit = min(template_limit, TOTAL_SYSTEM_TEMPLATES)
    available_templates = list(range(1, safe_limit + 1))
    
    return jsonify({
        'templates': available_templates, # The ones user CAN access
        'total': len(available_templates),
        'template_limit': template_limit,
        'user_type': user_doc.get('type', 'standard'),
        'subscription_plan': user_doc.get('subscription_plan', 'basic'),
        'total_system_templates': TOTAL_SYSTEM_TEMPLATES, # Total in existence
        'all_templates': list(range(1, TOTAL_SYSTEM_TEMPLATES + 1)) # Full list for UI rendering
    }), 200
