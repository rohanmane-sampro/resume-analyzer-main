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
        resume_text = data.get('text', '')[:3000]  # Increased from 2000 to 3000 chars
        
        prompt = f"""Parse this resume text and extract ALL information into structured JSON format.

CRITICAL: Extract ALL contact information including full name, email, phone, LinkedIn, location, etc.

Required JSON structure (return ONLY this JSON, no markdown):
{{
  "contactInfo": {{
    "fullName": "Full name from resume (REQUIRED - usually first line)",
    "emailAddress": "email@example.com",
    "phoneNumber": "+1234567890 or any phone format",
    "linkedin": "linkedin.com/in/username (if present)",
    "portfolio": "github.com/username or portfolio URL (if present)",
    "jobTitle": "Professional title or desired role (if mentioned)",
    "Location": "City, State or City, Country",
    "Languages": "Languages spoken (if mentioned)"
  }},
  "skills": {{
    "hardSkills": "comma-separated technical skills",
    "softSkills": "comma-separated soft skills"
  }},
  "workExperience": [
    {{
      "jobTitle": "Position title",
      "companyName": "Company name",
      "WorkDuration": "Jan 2020 - Present",
      "keyAchievements": "Bullet points or paragraph"
    }}
  ],
  "education": [
    {{
      "institutionName": "University/College name",
      "degreeName": "Degree type and field",
      "graduationYear": "Year",
      "currentCGPA": "GPA if mentioned"
    }}
  ],
  "projects": [
    {{
      "projectTitle": "Project name",
      "toolsTechUsed": "Technologies used"
    }}
  ],
  "certificates": [
    {{
      "certificateName": "Certificate name",
      "courseDuration": "Duration or year",
      "providerName": "Issuing organization"
    }}
  ],
  "Description": {{
    "UserDescription": "Professional summary or objective (if present)"
  }}
}}

IMPORTANT: 
- Extract the FULL NAME from the resume (usually the first prominent line)
- Include ALL contact information found
- Return ONLY valid JSON, no code blocks or markdown
- If a field is not found, use empty string "" or empty array []

Resume text:
{resume_text}"""
        
        response = safe_ai_call(prompt)
        try:
            json_text = response.strip().replace('```json', '').replace('```', '')
            parsed = json.loads(json_text)
            return jsonify({'success': True, 'data': parsed})
        except Exception as parse_error:
            print(f"JSON parsing error: {parse_error}")
            print(f"AI Response: {response[:500]}")
            return jsonify({'error': 'Failed to parse AI response as JSON', 'raw_response': response[:500]}), 500
    except Exception as e:
        print(f"Parse resume error: {str(e)}")
        return jsonify({'error': str(e)}), 500
