from flask import Blueprint, jsonify
from flask import current_app

main_bp = Blueprint('main', __name__)

@main_bp.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    pdf_status = "Enabled" if "weasyprint" in str(current_app.extensions) else "Browser-based" # Simplified check
    
    return jsonify({
        'status': 'healthy',
        'ai_configured': bool(current_app.config.get('GROQ_API_KEY')),
        'service': 'Resume Analyzer Unified Backend'
    })
