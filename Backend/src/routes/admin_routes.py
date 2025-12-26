from flask import Blueprint, request, jsonify
from src.database import templates_collection
from src.middleware.auth import admin_required
import datetime
from bson import ObjectId

admin_bp = Blueprint('admin', __name__)

@admin_bp.route('/templates', methods=['GET'])
def get_templates():
    templates = list(templates_collection.find({}))
    return jsonify([{**t, '_id': str(t['_id'])} for t in templates]), 200

@admin_bp.route('/templates', methods=['POST'])
@admin_required
def add_template(current_user):
    data = request.get_json()
    
    # Check limit (e.g., max 20 templates)
    current_count = templates_collection.count_documents({})
    if current_count >= 20:
        return jsonify({'message': 'Template limit reached (max 20)'}), 400
        
    template_data = {
        'name': data.get('name'),
        'description': data.get('description'),
        'category': data.get('category'),
        'is_active': True,
        'created_at': datetime.datetime.utcnow()
    }
    
    result = templates_collection.insert_one(template_data)
    return jsonify({'message': 'Template added', 'id': str(result.inserted_id)}), 201

@admin_bp.route('/templates/<template_id>', methods=['PUT'])
@admin_required
def update_template(current_user, template_id):
    data = request.get_json()
    templates_collection.update_one(
        {'_id': ObjectId(template_id)},
        {'$set': data}
    )
    return jsonify({'message': 'Template updated'}), 200

@admin_bp.route('/templates/<template_id>', methods=['DELETE'])
@admin_required
def delete_template(current_user, template_id):
    templates_collection.delete_one({'_id': ObjectId(template_id)})
    return jsonify({'message': 'Template deleted'}), 200
