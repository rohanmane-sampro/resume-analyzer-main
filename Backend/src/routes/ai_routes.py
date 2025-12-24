from flask import Blueprint, request, jsonify
from src.services.ai_service import AIService
from src.config import Config

ai_bp = Blueprint('ai', __name__)

@ai_bp.route('/enhance-content', methods=['POST'])
def enhance_content():
    """Enhance resume content using AI"""
    try:
        data = request.get_json()
        result = AIService.enhance_content(data)
        return jsonify(result)
    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@ai_bp.route('/chatbot', methods=['POST'])
def chatbot():
    """AI chatbot for resume building assistance"""
    try:
        data = request.get_json()
        user_message = data.get('message')
        conversation_history = data.get('history', [])
        current_section = data.get('section', 'general')
        user_data = data.get('userData', {})
        
        result = AIService.chatbot(user_message, conversation_history, user_data)
        return jsonify(result)
    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@ai_bp.route('/suggest-improvements', methods=['POST'])
def suggest_improvements():
    """Analyze entire resume and suggest improvements"""
    try:
        data = request.get_json()
        resume_data = data.get('resumeData')
        result = AIService.suggest_improvements(resume_data)
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@ai_bp.route('/generate-keywords', methods=['POST'])
def generate_keywords():
    """Generate relevant keywords for ATS optimization"""
    try:
        data = request.get_json()
        job_title = data.get('jobTitle')
        industry = data.get('industry', '')
        skills = data.get('skills', '')
        
        result = AIService.generate_keywords(job_title, industry, skills)
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@ai_bp.route('/complete-resume', methods=['POST'])
def complete_resume():
    """Complete and enhance entire resume with AI"""
    try:
        data = request.get_json()
        resume_data = data.get('resumeData')
        result = AIService.complete_resume(resume_data)
        return jsonify(result)
    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@ai_bp.route('/generate-profile-suggestions', methods=['POST'])
def generate_profile_suggestions():
    """Generate profile description suggestions based on job title and skills"""
    try:
        data = request.get_json()
        job_title = data.get('jobTitle', '')
        skills = data.get('skills', '')
        experience_level = data.get('experienceLevel', 'mid')
        
        if not job_title:
            return jsonify({'error': 'Job title is required'}), 400
            
        result = AIService.generate_profile_suggestions(job_title, skills, experience_level)
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@ai_bp.route('/parse-resume-with-ai', methods=['POST'])
def parse_resume_with_ai():
    """Parse resume text content into structured JSON using AI"""
    try:
        data = request.get_json()
        resume_text = data.get('text', '')
        
        result = AIService.parse_resume_with_ai(resume_text)
        return jsonify(result)
    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@ai_bp.route('/test-ai', methods=['GET'])
def test_ai():
    """Test AI connection"""
    # This was a bit custom in the original, checking Config manually
    try:
        # We can implement a simple test in service or just mock it here
        from src.services.ai_service import safe_ai_call
        test_prompt = "Say 'Hello! AI is working correctly.' in a friendly way."
        result = safe_ai_call(test_prompt)
        return jsonify({
            'status': 'success',
            'response': result,
            'api_key_configured': bool(Config.GROQ_API_KEY)
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'error': str(e),
            'api_key_configured': bool(Config.GROQ_API_KEY)
        }), 500

@ai_bp.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'ai_configured': bool(Config.GROQ_API_KEY),
        'service': 'Resume AI Assistant'
    })
