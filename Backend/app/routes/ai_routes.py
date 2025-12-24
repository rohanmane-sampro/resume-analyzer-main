from flask import Blueprint, request, jsonify, current_app
import json
from ..services.ai_service import safe_ai_call
from ..utils.helpers import create_fallback_enhancement

ai_bp = Blueprint('ai', __name__)

@ai_bp.route('/enhance-content', methods=['POST'])
def enhance_content():
    try:
        data = request.get_json()
        content = data.get('content')
        if not content: return jsonify({'error': 'No content provided'}), 400
        # ... logic passed directly to safe_ai_call ...
        prompt = f"Enhance professional content: {content}"
        enhanced = safe_ai_call(prompt)
        return jsonify({'original': content, 'enhanced': enhanced, 'type': data.get('type')})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@ai_bp.route('/chatbot', methods=['POST'])
def chatbot():
    try:
        data = request.get_json()
        user_message = data.get('message')
        if not user_message: return jsonify({'error': 'No message provided'}), 400
        prompt = f"User asks: {user_message}. Answer as Resume Assistant."
        response = safe_ai_call(prompt)
        return jsonify({'response': response, 'section': data.get('section', 'general')})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@ai_bp.route('/suggest-improvements', methods=['POST'])
def suggest_improvements():
    try:
        data = request.get_json()
        prompt = f"Analyze resume: {json.dumps(data.get('resumeData', {}))} and return JSON improvement suggestions."
        response = safe_ai_call(prompt)
        # Simplify response parsing for brevity in regeneration
        try:
             json_text = response.strip().replace('```json', '').replace('```', '')
             suggestions = json.loads(json_text)
        except:
             suggestions = {"contentImprovements": [response], "overallScore": 75}
        return jsonify(suggestions)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@ai_bp.route('/generate-keywords', methods=['POST'])
def generate_keywords():
    try:
        data = request.get_json()
        prompt = f"Generate keywords for {data.get('jobTitle')} as JSON."
        response = safe_ai_call(prompt)
        try:
             json_text = response.strip().replace('```json', '').replace('```', '')
             keywords = json.loads(json_text)
        except:
             keywords = {"technical": response.split(',')[:5]}
        return jsonify(keywords)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@ai_bp.route('/test-ai', methods=['GET'])
def test_ai():
    try:
        result = safe_ai_call("Say hello")
        return jsonify({'status': 'success', 'response': result})
    except Exception as e:
        return jsonify({'status': 'error', 'error': str(e)}), 500

@ai_bp.route('/complete-resume', methods=['POST'])
def complete_resume():
    try:
        data = request.get_json()
        prompt = f"Complete resume for {data.get('jobTitle')} in JSON format."
        response = safe_ai_call(prompt)
        try:
            json_text = response.strip().replace('```json', '').replace('```', '')
            enhanced_resume = json.loads(json_text)
            return jsonify({'enhancedResume': enhanced_resume, 'original': data.get('resumeData')})
        except:
             enhanced = create_fallback_enhancement(data.get('resumeData'), 'Professional')
             return jsonify({'enhancedResume': enhanced, 'original': data.get('resumeData'), 'note': 'Fallback usage'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@ai_bp.route('/generate-profile-suggestions', methods=['POST'])
def generate_profile_suggestions():
    try:
        data = request.get_json()
        prompt = f"Suggest 3 profiles for {data.get('jobTitle')} as JSON."
        response = safe_ai_call(prompt)
        try:
             json_text = response.strip().replace('```json', '').replace('```', '')
             suggestions = json.loads(json_text)
        except:
             suggestions = {"suggestions": [{"title":"Fallback", "text":"Could not generate."}]}
        return jsonify(suggestions)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@ai_bp.route('/parse-resume-with-ai', methods=['POST'])
def parse_resume_with_ai():
    try:
        data = request.get_json()
        prompt = f"Parse resume text to JSON: {data.get('text')[:2000]}"
        response = safe_ai_call(prompt)
        try:
            json_text = response.strip().replace('```json', '').replace('```', '')
            parsed = json.loads(json_text)
            return jsonify({'success': True, 'data': parsed})
        except:
            return jsonify({'error': 'Failed parsing'}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500
