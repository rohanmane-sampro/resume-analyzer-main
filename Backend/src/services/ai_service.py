import os
import json
from src.config import Config

# Initialize Groq client
groq_client = None

if Config.GROQ_API_KEY:
    try:
        from groq import Groq
        groq_client = Groq(api_key=Config.GROQ_API_KEY)
        print("SUCCESS: Groq AI configured (Primary)")
    except ImportError:
        print("WARNING: 'groq' package not installed. Run 'pip install groq'")
else:
    print("ERROR: GROQ_API_KEY not found in environment variables!")

def safe_ai_call(prompt, max_retries=3, max_tokens=4096):
    """Safely call AI using ONLY Groq"""
    global groq_client
    
    if not groq_client:
        return "AI Error: Groq is not configured. Please check your .env file."
    
    for attempt in range(max_retries):
        try:
            print(f"Attempt {attempt + 1}: Making Groq AI call (max_tokens={max_tokens})...")
            completion = groq_client.chat.completions.create(
                messages=[{"role": "user", "content": prompt}],
                model="llama-3.3-70b-versatile", # Supported model
                temperature=0.7,
                max_tokens=max_tokens,
            )
            response = completion.choices[0].message.content
            if response:
                print(f"SUCCESS: Groq response received (length: {len(response)})")
                return response
        except Exception as e:
            print(f"Groq call failed (Attempt {attempt+1}): {str(e)}")
            if attempt == max_retries - 1:
                return f"AI Service Error: {str(e)}"

def create_fallback_enhancement(resume_data, job_title):
    """Create enhanced resume when AI response can't be parsed"""
    enhanced = json.loads(json.dumps(resume_data))  # Deep copy
    
    # Enhance contact info
    if not enhanced.get('contactInfo', {}).get('jobTitle'):
        enhanced.setdefault('contactInfo', {})['jobTitle'] = job_title
    
    # Enhance description - NO MARKDOWN
    if not enhanced.get('Description', {}).get('UserDescription') or len(enhanced.get('Description', {}).get('UserDescription', '')) < 50:
        enhanced.setdefault('Description', {})['UserDescription'] = f"Experienced {job_title} with proven expertise in delivering results. Strong problem-solving and collaboration skills."
    
    # Enhance skills - NO MARKDOWN, CONCISE LISTS
    skills = enhanced.setdefault('skills', {})
    if not skills.get('hardSkills') or len(skills.get('hardSkills', '')) < 20:
        if 'developer' in job_title.lower() or 'engineer' in job_title.lower():
            skills['hardSkills'] = "JavaScript, Python, React, Node.js, Git, SQL"
        elif 'designer' in job_title.lower():
            skills['hardSkills'] = "Figma, Adobe Creative Suite, UI/UX Design, Prototyping"
        elif 'manager' in job_title.lower():
            skills['hardSkills'] = "Project Management, Agile, Leadership, Analytics"
        else:
            skills['hardSkills'] = "Microsoft Office, Data Analysis, Communication, Problem Solving"
    
    if not skills.get('softSkills') or len(skills.get('softSkills', '')) < 20:
        skills['softSkills'] = "Leadership, Communication, Teamwork, Time Management, Adaptability"
    
    # Enhance work experience with role descriptions
    if enhanced.get('workExperience') and isinstance(enhanced['workExperience'], list):
        for exp in enhanced['workExperience']:
            if exp.get('keyAchievements') and len(exp['keyAchievements']) < 100:
                role = exp.get('jobTitle', 'Professional')
                # Add as single paragraph with bold terms
                exp['keyAchievements'] = f"Responsible for driving results and contributing to organizational success. **Delivered** high-quality work exceeding expectations and **collaborated** with cross-functional teams to **improve** processes and efficiency."
    
    # Ensure projects exist
    if not enhanced.get('projects') or not enhanced['projects'][0].get('projectTitle'):
        enhanced['projects'] = [{
            'projectTitle': f"{job_title} Portfolio Project",
            'toolsTechUsed': skills.get('hardSkills', '').split(',')[0:3] if skills.get('hardSkills') else "Modern Technologies"
        }]
    
    return enhanced

class AIService:
    @staticmethod
    def enhance_content(data):
        content_type = data.get('type')  # 'description', 'skills', 'experience', etc.
        content = data.get('content')
        job_title = data.get('jobTitle', '')
        
        if not content:
            raise ValueError('No content provided')
        
        # Create specific prompts based on content type
        prompts = {
            'description': f"""
                Enhance this professional summary for a {job_title} role. Make it more impactful, professional, and ATS-friendly:
                
                Original: {content}
                
                Requirements:
                - Keep it concise (2-3 lines)
                - Use action words and quantifiable achievements
                - Make it industry-specific
                - Ensure ATS keyword optimization
                - Sound professional and confident
                
                Return only the enhanced summary, no explanation.
            """,
            
            'skills': f"""
                Improve and organize these skills for a {job_title} position:
                
                Original: {content}
                
                Requirements:
                - Separate into Technical Skills and Soft Skills
                - Add relevant industry skills if missing
                - Prioritize most important skills first
                - Use proper formatting with commas
                - Ensure ATS-friendly keywords
                
                Format:
                Technical Skills: skill1, skill2, skill3...
                Soft Skills: skill1, skill2, skill3...
            """,
            
            'experience': f"""
                Enhance this work experience description for a {job_title}:
                
                Original: {content}
                
                Requirements:
                - Use strong action verbs (Developed, Implemented, Led, etc.)
                - Include quantifiable results where possible
                - Make it achievement-focused rather than task-focused
                - Keep it professional and impactful
                - Use bullet points if multiple achievements
                
                Return only the enhanced description.
            """,
            
            'project': f"""
                Improve this project description for a {job_title}'s resume:
                
                Original: {content}
                
                Requirements:
                - Highlight technical achievements and impact
                - Mention technologies used clearly
                - Show problem-solving abilities
                - Include results or outcomes if possible
                - Keep it concise but comprehensive
                
                Return only the enhanced project description.
            """,
            
            'general': f"""
                Enhance this resume content for a {job_title} position:
                
                Original: {content}
                
                Make it more professional, impactful, and ATS-friendly while maintaining accuracy.
                Return only the enhanced content.
            """
        }
        
        prompt = prompts.get(content_type, prompts['general'])
        enhanced_content = safe_ai_call(prompt)
        
        return {
            'original': content,
            'enhanced': enhanced_content,
            'type': content_type
        }

    @staticmethod
    def chatbot(user_message, history, user_data):
        if not user_message:
            raise ValueError('No message provided')
        
        # Extract user context
        job_title = user_data.get('jobTitle', 'Professional')
        skills = user_data.get('skills', '')
        current_section = user_data.get('currentSection', 'general')
        completion_level = user_data.get('completionLevel', 0)
        has_experience = user_data.get('hasExperience', False)
        
        # Create context-aware prompts for better responses
        context = f"""
        You are a professional resume writing assistant. The user is currently working on their resume.
        
        User Context:
        - Job Title: {job_title}
        - Current Section: {current_section}
        - Skills Listed: {skills[:100] if skills else 'Not provided yet'}
        - Form Completion: {completion_level}%
        - Has Experience Listed: {has_experience}
        
        Guidelines:
        - ALWAYS provide specific, actionable advice
        - Use the user's provided information to give personalized responses
        - If asking for descriptions, provide direct examples using their job title
        - Don't ask for information the user likely already provided
        - Focus on ATS optimization and professional standards
        - Be concise and immediately helpful
        
        Common Queries and How to Handle:
        - "good description" or "profile description" → Provide a sample professional summary using their job title
        - "skills" → Suggest industry-specific skills for their role
        - "experience" → Give examples of how to write achievement-focused descriptions
        - "keywords" → Provide ATS-friendly keywords for their industry
        
        User's Question: {user_message}
        
        Provide a direct, helpful response that uses their context where possible:
        """
        
        # Handle common patterns with direct responses
        lower_message = user_message.lower()
        
        if any(word in lower_message for word in ['description', 'summary', 'about me', 'profile']):
            if job_title and job_title != 'Professional':
                context += f"""
                
                IMPORTANT: Provide a sample professional summary for a {job_title}. 
                Give 2-3 specific examples they can use or modify.
                Include industry keywords and quantifiable achievements.
                Don't ask for more details - be directly helpful.
                """
            else:
                context += f"""
                
                IMPORTANT: Provide general professional summary templates that work for most roles.
                Give 2-3 examples with placeholders they can customize.
                Include tips for making it ATS-friendly.
                """
        
        elif any(word in lower_message for word in ['skills', 'skill', 'abilities']):
            context += f"""
            
            IMPORTANT: Suggest specific skills for {job_title} role.
            Provide both technical and soft skills.
            Give examples they can copy-paste.
            Don't ask questions - be immediately helpful.
            """
        
        elif any(word in lower_message for word in ['experience', 'work', 'job', 'achievement']):
            context += f"""
            
            IMPORTANT: Show how to write impactful work experience descriptions.
            Use action verbs and quantifiable results.
            Give examples for {job_title} or similar roles.
            """
        
        response = safe_ai_call(context)
        return {
            'response': response,
            'section': current_section
        }

    @staticmethod
    def suggest_improvements(resume_data):
        job_title = resume_data.get('contactInfo', {}).get('jobTitle', '')
        
        prompt = f"""
        Analyze this resume data for a {job_title} position and provide specific improvement suggestions:
        
        Resume Data:
        {json.dumps(resume_data, indent=2)}
        
        Provide suggestions in the following categories:
        1. Content Improvements (specific sections that need work)
        2. Missing Information (what should be added)
        3. ATS Optimization (keyword suggestions)
        4. Structure & Formatting (organization improvements)
        5. Professional Impact (how to make it more compelling)
        
        Format as JSON:
        {{
            "contentImprovements": ["suggestion1", "suggestion2"],
            "missingInformation": ["missing1", "missing2"],
            "atsOptimization": ["keyword1", "keyword2"],
            "structure": ["structure1", "structure2"],
            "impact": ["impact1", "impact2"],
            "overallScore": 85
        }}
        """
        
        response = safe_ai_call(prompt)
        
        try:
            # Try to parse as JSON, fallback to text if failed
            # Clean possible markdown
            json_text = response.strip()
            if json_text.startswith('```json'):
                json_text = json_text[7:]
            if json_text.endswith('```'):
                json_text = json_text[:-3]
            suggestions = json.loads(json_text)
        except:
            # If JSON parsing fails, create structured response
            suggestions = {
                "contentImprovements": [response],
                "missingInformation": [],
                "atsOptimization": [],
                "structure": [],
                "impact": [],
                "overallScore": 75
            }
        
        return suggestions

    @staticmethod
    def generate_keywords(job_title, industry, skills):
        prompt = f"""
        Generate ATS-optimized keywords for a {job_title} position in {industry} industry.
        Current skills: {skills}
        
        Provide:
        1. Technical keywords (10-15 most important)
        2. Soft skills keywords (5-8 relevant)
        3. Industry-specific terms (5-10)
        4. Action verbs for experience section (10)
        
        Format as JSON:
        {{
            "technical": ["keyword1", "keyword2"],
            "softSkills": ["skill1", "skill2"],
            "industry": ["term1", "term2"],
            "actionVerbs": ["verb1", "verb2"]
        }}
        """
        
        response = safe_ai_call(prompt)
        
        try:
            json_text = response.strip()
            if json_text.startswith('```json'):
                json_text = json_text[7:]
            if json_text.endswith('```'):
                json_text = json_text[:-3]
            keywords = json.loads(json_text)
        except:
            keywords = {
                "technical": response.split(',')[:10] if response else [],
                "softSkills": [],
                "industry": [],
                "actionVerbs": []
            }
        
        return keywords

    @staticmethod
    def complete_resume(resume_data):
        if not resume_data:
            raise ValueError('No resume data provided')
        
        # Extract current information
        contact_info = resume_data.get('contactInfo', {})
        job_title = contact_info.get('jobTitle', 'Professional')
        
        prompt = f"""
        You are an expert resume writer. Complete and enhance this resume for a {job_title} position. 
        
        Current Resume Data:
        {json.dumps(resume_data, indent=2)}
        
        CRITICAL REQUIREMENTS - CONCISE CONTENT ONLY:
        1. Keep ALL content concise - NO long paragraphs or extensive text
        2. Professional Summary: Maximum 2-3 SHORT sentences (under 150 characters total)
        3. Experience descriptions: Maximum 3-4 bullet points per job, each under 100 characters
        4. Project descriptions: Maximum 2-3 short sentences per project
        5. Skills: Comma-separated keywords only, no explanations
        6. Use BOLD (**text**) ONLY in experience and project descriptions for key achievements
        7. DO NOT use bold in: skills, education, contact info, or profile summary
        8. Prioritize SINGLE PAGE layout - do not add excessive content
        9. Focus on IMPACT and KEYWORDS, not lengthy descriptions
        
        Enhancement Guidelines:
        - Professional Summary: Compelling but BRIEF (2 lines max) - NO MARKDOWN
        - Skills: Add relevant keywords but keep list manageable - NO MARKDOWN, plain comma-separated
        - Experience: Add 1-2 line role summary below job title, then bullet points with bold achievements
        - Projects: Technical details in CONCISE format - USE BOLD for technologies
        - Education: Keep standard - NO MARKDOWN
        - Contact Info: Keep as is - NO MARKDOWN
        
        WORK EXPERIENCE FORMAT (IMPORTANT):
        For each work experience, write keyAchievements as ONE short paragraph (2-3 sentences).
        Include role description and key achievements in a flowing paragraph with **bold** for important terms.
        
        Example format for keyAchievements:
        "Contributed to full-stack web application development, focusing on robust backend and intuitive frontend solutions. **Developed** and **deployed** a full-stack web app using **React.js**, **Node.js**, and **MongoDB**. **Enhanced** user experience and **improved performance by 40%** through optimization."
        
        DO NOT use bullet points (•) - write as continuous paragraph text.
        
        FORMAT REQUIREMENTS:
        - Bold ONLY in experience/projects: **Python**, **increased sales by 30%**
        - Skills should be plain text: Python, JavaScript, React (NO asterisks)
        - Keep descriptions under 100 characters each
        - Maintain same JSON structure
        
        Return ONLY the enhanced JSON data with the same structure. No explanation or markdown formatting.
        
        Enhanced Resume JSON:
        """
        
        enhanced_content = safe_ai_call(prompt)
        
        try:
            # Try to parse the AI response as JSON
            # Clean up any potential markdown formatting
            json_text = enhanced_content.strip()
            if json_text.startswith('```json'):
                json_text = json_text[7:]
            if json_text.endswith('```'):
                json_text = json_text[:-3]
            json_text = json_text.strip()
            
            enhanced_resume = json.loads(json_text)
            
            return {
                'enhancedResume': enhanced_resume,
                'original': resume_data
            }
            
        except json.JSONDecodeError:
            # If JSON parsing fails, create enhanced version manually
            enhanced_resume = create_fallback_enhancement(resume_data, job_title)
            return {
                'enhancedResume': enhanced_resume,
                'original': resume_data,
                'note': 'Used fallback enhancement due to AI response format'
            }

    @staticmethod
    def generate_profile_suggestions(job_title, skills, experience_level='mid'):
        prompt = f"""
        Create 3 SHORT, ATS-optimized professional summary suggestions for a {job_title} with {experience_level}-level experience.
        Skills: {skills}
        
        CRITICAL REQUIREMENTS:
        - Each suggestion must be EXACTLY 3 lines
        - Each line should be concise (around 40-50 characters)
        - Focus on ATS keywords and quantifiable achievements
        - Use industry-specific terminology
        - Include relevant skills from the provided skills list
        - NO fluff or generic statements
        - Make each line impactful and keyword-rich
        
        Format for each suggestion (3 separate lines):
        Line 1: Role/expertise statement with key skills
        Line 2: Achievement or technical proficiency
        Line 3: Impact or specialization focus
        
        Each suggestion should be:
        - Professional and direct
        - Keyword-rich for ATS systems
        - Achievement or skill-focused
        - Unique in approach
        
        Suggestion 1: Results-driven with quantifiable achievements
        Suggestion 2: Skills and technology-focused
        Suggestion 3: Industry expertise and impact-focused
        
        Format as JSON:
        {{
            "suggestions": [
                {{
                    "title": "Results-Driven Professional",
                    "text": "Line 1 here. Line 2 here. Line 3 here."
                }},
                {{
                    "title": "Technical Expert", 
                    "text": "Line 1 here. Line 2 here. Line 3 here."
                }},
                {{
                    "title": "Industry Specialist",
                    "text": "Line 1 here. Line 2 here. Line 3 here."
                }}
            ]
        }}
        """
        
        response = safe_ai_call(prompt)
        
        try:
            json_text = response.strip()
            if json_text.startswith('```json'):
                json_text = json_text[7:]
            if json_text.endswith('```'):
                json_text = json_text[:-3]
            suggestions = json.loads(json_text)
        except:
            # Fallback suggestions - 3 lines, SHORT and ATS-friendly
            skill_list = skills.split(',')[:3] if skills else ['relevant technologies']
            skill_str = ', '.join([s.strip() for s in skill_list])
            
            suggestions = {
                "suggestions": [
                    {
                        "title": "Results-Driven Professional",
                        "text": f"{job_title} with proven expertise in {skill_str}. Delivered high-impact solutions driving measurable business results. Specialized in data-driven decision making and process optimization."
                    },
                    {
                        "title": "Technical Expert",
                        "text": f"Skilled {job_title} proficient in {skill_str}. Strong technical foundation with hands-on project experience. Committed to innovation and continuous improvement."
                    },
                    {
                        "title": "Industry Specialist", 
                        "text": f"Experienced {job_title} leveraging {skill_str} for business success. Applied analytical skills to solve complex challenges. Passionate about delivering value through technology."
                    }
                ]
            }
        
        return suggestions

    @staticmethod
    def parse_resume_with_ai(resume_text):
        if not resume_text:
            raise ValueError('No text provided')
            
        print(f"Parsing resume text with AI (length: {len(resume_text)})")
        
        # Limit text but keep more content for better parsing
        text_to_parse = resume_text[:30000] if len(resume_text) > 30000 else resume_text
        
        prompt = f"""
        You are an expert resume parser with deep understanding of various resume formats. 
        Extract ALL available structured data from this resume text and return it as valid JSON.
        
        IMPORTANT INSTRUCTIONS:
        - Extract EVERY piece of information you can find
        - For work experience, include ALL jobs listed (not just the first one)
        - For education, include ALL degrees/institutions
        - For projects, extract ALL projects mentioned
        - For skills, separate technical/hard skills from soft skills
        - If a section has multiple entries, include them all in the array
        - Be thorough and don't skip any content
        
        RESUME TEXT:
        {text_to_parse}
        
        Extract the following fields in this EXACT JSON structure:
        {{
            "contactInfo": {{
                "fullName": "",           # Extract full name from header
                "emailAddress": "",       # Find email address
                "phoneNumber": "",        # Find phone number
                "linkedin": "",           # LinkedIn profile URL if present
                "portfolio": "",          # Portfolio/GitHub/website URL
                "jobTitle": "",           # Current job title or desired role
                "Location": "",           # City, State or location
                "Languages": ""           # Languages known (comma separated)
            }},
            "skills": {{
                "hardSkills": "",         # Technical skills (comma separated: Python, Java, React, etc.)
                "softSkills": ""          # Soft skills (comma separated: Leadership, Communication, etc.)
            }},
            "workExperience": [          # Array of ALL work experiences
                {{
                    "jobTitle": "",       # Job position/title
                    "companyName": "",    # Company name
                    "WorkDuration": "",   # e.g. "Jan 2020 - Present" or "2020-2022"
                    "keyAchievements": "" # Responsibilities and achievements (can be multi-line)
                }}
            ],
            "projects": [                # Array of ALL projects
                {{
                    "projectTitle": "",   # Project name
                    "toolsTechUsed": ""   # Technologies used (comma separated)
                }}
            ],
            "education": [               # Array of ALL education entries
                {{
                    "institutionName": "", # University/College name
                    "degreeName": "",      # Degree type and field (e.g., "B.Tech in Computer Science")
                    "graduationYear": "",  # Year of graduation
                    "currentCGPA": ""      # GPA/CGPA/Percentage if mentioned
                }}
            ],
            "certificates": [            # Array of ALL certifications
                {{
                    "certificateName": "", # Certificate name
                    "providerName": "",    # Issuing organization
                    "courseDuration": ""   # Duration or year obtained
                }}
            ],
            "Description": {{
                "UserDescription": ""     # Professional summary/objective from resume
            }}
        }}
        
        CRITICAL RULES:
        1. Extract ALL entries for arrays (workExperience, projects, education, certificates)
        2. If a section is not present, use empty string for strings or empty array [] for arrays
        3. Combine all skills into comma-separated strings
        4. For workExperience keyAchievements, include all bullet points/responsibilities
        5. Return ONLY valid JSON - no explanations, no markdown, just the JSON object
        6. Ensure all field names match exactly as shown above
        """
        
        try:
            response = safe_ai_call(prompt, max_retries=3, max_tokens=8192)
            
            if not response or "AI Error" in response or "AI Service Error" in response:
                raise Exception(f"AI service returned error: {response}")
            
            # Clean up code blocks if present
            json_text = response.strip()
            
            # Remove markdown code blocks
            if json_text.startswith('```json'):
                json_text = json_text[7:]
            elif json_text.startswith('```'):
                json_text = json_text[3:]
                
            if json_text.endswith('```'):
                json_text = json_text[:-3]
                
            json_text = json_text.strip()
            
            # Parse JSON
            parsed_data = json.loads(json_text)
            
            # Validate structure
            required_keys = ['contactInfo', 'skills', 'workExperience', 'projects', 'education', 'certificates', 'Description']
            for key in required_keys:
                if key not in parsed_data:
                    print(f"WARNING: Missing key '{key}' in parsed data, adding empty value")
                    if key in ['workExperience', 'projects', 'education', 'certificates']:
                        parsed_data[key] = []
                    elif key == 'Description':
                        parsed_data[key] = {'UserDescription': ''}
                    else:
                        parsed_data[key] = {}
            
            print(f"Successfully parsed resume with AI: {len(parsed_data.get('workExperience', []))} jobs, {len(parsed_data.get('education', []))} education entries")
            
            return {
                'success': True,
                'data': parsed_data
            }
            
        except json.JSONDecodeError as e:
            print(f"JSON parsing error: {e}")
            print(f"Response was: {response[:500]}...")
            raise Exception(f"Failed to parse AI response as JSON: {str(e)}")
        except Exception as e:
            print(f"Error in AI parsing: {e}")
            raise
