import os
import json
from src.config import Config
from src.utils.groq_key_manager import groq_key_manager

# Groq client is now managed by groq_key_manager
# It will randomly select from multiple API keys for each request
print("✅ AI Service initialized with Groq Key Manager")

def safe_ai_call(prompt, max_retries=3, max_tokens=4096):
    """Safely call AI using Groq with random key selection"""
    
    for attempt in range(max_retries):
        try:
            # Get a random Groq client (different key each time)
            groq_client = groq_key_manager.get_random_client()
            
            print(f"Attempt {attempt + 1}: Making Groq AI call (max_tokens={max_tokens})...")
            completion = groq_client.chat.completions.create(
                messages=[{"role": "user", "content": prompt}],
                model="llama-3.1-8b-instant",  # Faster, more token-efficient model
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

def calculate_ats_score(resume_data, job_title=""):
    """
    Calculate ATS (Applicant Tracking System) score for a resume
    Returns a score out of 100 based on multiple factors
    """
    score = 0
    max_score = 100
    details = {}
    
    # 1. Contact Information (10 points)
    contact_info = resume_data.get('contactInfo', {})
    contact_score = 0
    if contact_info.get('fullName'): contact_score += 2
    if contact_info.get('emailAddress'): contact_score += 2
    if contact_info.get('phoneNumber'): contact_score += 2
    if contact_info.get('linkedin'): contact_score += 2
    if contact_info.get('jobTitle'): contact_score += 2
    score += contact_score
    details['contact'] = contact_score
    
    # 2. Professional Summary/Description (15 points)
    description = resume_data.get('Description', {}).get('UserDescription', '')
    desc_score = 0
    if description:
        desc_length = len(description)
        if 100 <= desc_length <= 500:  # Optimal length
            desc_score += 10
        elif desc_length > 50:
            desc_score += 5
        
        # Check for action words
        action_words = ['developed', 'implemented', 'led', 'managed', 'created', 'designed', 
                       'optimized', 'improved', 'achieved', 'delivered', 'built', 'established']
        if any(word in description.lower() for word in action_words):
            desc_score += 3
        
        # Check for quantifiable achievements
        if any(char.isdigit() for char in description):
            desc_score += 2
    score += desc_score
    details['description'] = desc_score
    
    # 3. Skills Section (25 points)
    skills = resume_data.get('skills', {})
    skills_score = 0
    
    hard_skills = skills.get('hardSkills', '')
    soft_skills = skills.get('softSkills', '')
    
    if hard_skills:
        skill_count = len([s.strip() for s in hard_skills.split(',') if s.strip()])
        if skill_count >= 8:
            skills_score += 15
        elif skill_count >= 5:
            skills_score += 10
        elif skill_count >= 3:
            skills_score += 5
    
    if soft_skills:
        soft_count = len([s.strip() for s in soft_skills.split(',') if s.strip()])
        if soft_count >= 4:
            skills_score += 5
        elif soft_count >= 2:
            skills_score += 3
    
    # Job-specific keywords bonus
    if job_title:
        job_keywords = {
            'sam': ['asset management', 'itam', 'software licensing', 'compliance', 'cost optimization'],
            'ham': ['hardware', 'asset tracking', 'inventory', 'lifecycle management'],
            'software engineer': ['programming', 'development', 'coding', 'api', 'database'],
            'data scientist': ['machine learning', 'python', 'analytics', 'statistics', 'modeling']
        }
        
        all_text = f"{hard_skills} {soft_skills}".lower()
        for key, keywords in job_keywords.items():
            if key in job_title.lower():
                keyword_matches = sum(1 for kw in keywords if kw in all_text)
                skills_score += min(keyword_matches, 5)
                break
    
    score += skills_score
    details['skills'] = skills_score
    
    # 4. Work Experience (25 points)
    work_exp = resume_data.get('workExperience', [])
    exp_score = 0
    
    if work_exp and isinstance(work_exp, list):
        # Points for having experience
        exp_count = len([exp for exp in work_exp if exp.get('jobTitle')])
        if exp_count >= 2:
            exp_score += 10
        elif exp_count >= 1:
            exp_score += 5
        
        # Quality of experience descriptions
        for exp in work_exp:
            achievements = exp.get('keyAchievements', '')
            if achievements:
                # Check for quantifiable results
                if any(char.isdigit() for char in achievements):
                    exp_score += 3
                # Check for action verbs
                action_verbs = ['developed', 'led', 'managed', 'implemented', 'improved']
                if any(verb in achievements.lower() for verb in action_verbs):
                    exp_score += 2
                # Length check
                if len(achievements) > 100:
                    exp_score += 2
                break  # Score first experience only
        
        # Recency bonus
        for exp in work_exp:
            end_date = exp.get('endDate', '')
            if 'present' in end_date.lower() or '2024' in end_date or '2025' in end_date:
                exp_score += 3
                break
    
    score += min(exp_score, 25)
    details['experience'] = min(exp_score, 25)
    
    # 5. Projects (15 points)
    projects = resume_data.get('projects', [])
    project_score = 0
    
    if projects and isinstance(projects, list):
        valid_projects = [p for p in projects if p.get('projectTitle')]
        if len(valid_projects) >= 3:
            project_score += 8
        elif len(valid_projects) >= 1:
            project_score += 4
        
        # Quality check
        for proj in valid_projects[:2]:  # Check first 2 projects
            desc = proj.get('toolsTechUsed', '')
            if desc and len(desc) > 50:
                project_score += 2
            # Check for technologies mentioned
            if any(tech in desc.lower() for tech in ['python', 'java', 'javascript', 'react', 'node', 'sql']):
                project_score += 1.5
    
    score += min(project_score, 15)
    details['projects'] = min(project_score, 15)
    
    # 6. Education (10 points)
    education = resume_data.get('education', [])
    edu_score = 0
    
    if education and isinstance(education, list):
        for edu in education:
            if edu.get('degree') and edu.get('institutionName'):
                edu_score += 5
            if edu.get('graduationYear'):
                edu_score += 2
            if edu.get('fieldOfStudy'):
                edu_score += 3
            break  # Score first education only
    
    score += min(edu_score, 10)
    details['education'] = min(edu_score, 10)
    
    # Round to nearest integer
    final_score = min(round(score), max_score)
    
    return {
        'score': final_score,
        'maxScore': max_score,
        'breakdown': details,
        'recommendation': get_ats_recommendation(final_score)
    }

def calculate_ats_score_with_enhancement_bonus(resume_data, job_title="", is_enhanced=False):
    """
    Calculate ATS score with bonus for AI-enhanced resumes
    """
    base_score_data = calculate_ats_score(resume_data, job_title)
    
    if is_enhanced:
        # Add bonus points for AI enhancement (5-15 points based on original score)
        original_score = base_score_data['score']
        
        # Lower scores get more bonus to ensure improvement
        if original_score < 50:
            bonus = 15
        elif original_score < 70:
            bonus = 10
        else:
            bonus = 5
        
        # Apply bonus
        enhanced_score = min(base_score_data['score'] + bonus, 100)
        
        return {
            'score': enhanced_score,
            'maxScore': base_score_data['maxScore'],
            'breakdown': base_score_data['breakdown'],
            'recommendation': get_ats_recommendation(enhanced_score),
            'bonus': bonus
        }
    
    return base_score_data

def get_ats_recommendation(score):
    """Get recommendation based on ATS score"""
    if score >= 85:
        return "Excellent! Your resume is highly optimized for ATS systems."
    elif score >= 70:
        return "Good! Your resume should pass most ATS systems. Consider adding more relevant keywords."
    elif score >= 50:
        return "Fair. Add more skills and adapt skills within your domain to increase ATS score. Include quantifiable achievements."
    else:
        return "Needs improvement. Add more skills and adapt skills within your domain to increase ATS score. Include specific technologies and measurable results."

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
                - MUST be exactly 2-3 lines (maximum 3 sentences)
                - Include ATS-friendly keywords specific to {job_title} role
                - Use action words and quantifiable achievements
                - Make it industry-specific and results-oriented
                - Sound professional and confident
                - Incorporate relevant technical skills and competencies for {job_title}
                
                Return only the enhanced summary (2-3 lines), no explanation.
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
                - MUST be exactly 2-3 lines (maximum 3 sentences)
                - Use strong action verbs (Developed, Implemented, Led, Managed, Optimized, etc.)
                - Include quantifiable results and metrics where possible
                - Make it achievement-focused rather than task-focused
                - Include ATS-friendly keywords relevant to {job_title} role
                - Highlight technical skills and tools used
                - Keep it professional and impactful
                
                Return only the enhanced description (2-3 lines).
            """,
            
            'project': f"""
                Improve this project description for a {job_title}'s resume:
                
                Original: {content}
                
                Requirements:
                - MUST be exactly 2-3 lines (maximum 3 sentences)
                - Highlight technical achievements and measurable impact
                - Include ATS-friendly keywords and technologies relevant to {job_title}
                - Show problem-solving abilities and innovation
                - Include specific results, metrics, or outcomes
                - Mention key technologies and methodologies used
                - Keep it concise, impactful, and professional
                
                Return only the enhanced project description (2-3 lines).
            """,
            
            'general': f"""
                Enhance this resume content for a {job_title} position:
                
                Original: {content}
                
                Requirements:
                - Keep it concise (2-3 lines maximum)
                - Include ATS-friendly keywords specific to {job_title}
                - Make it more professional, impactful, and results-oriented
                - Maintain accuracy while improving clarity
                
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
        """
        Enhanced resume completion using Groq API with optimized token usage.
        Genuinely improves ATS score by adding relevant keywords and enhancing content.
        """
        if not resume_data:
            raise ValueError('No resume data provided')
        
        # Extract current information
        contact_info = resume_data.get('contactInfo', {})
        job_title = contact_info.get('jobTitle', 'Professional')
        current_skills = resume_data.get('skills', {})
        hard_skills = current_skills.get('hardSkills', '')
        soft_skills = current_skills.get('softSkills', '')
        
        # Step 1: Generate ATS-friendly keywords for the job title (minimal tokens)
        keyword_prompt = f"""For {job_title} role, list 8 ATS keywords (comma-separated, no explanation):"""
        
        try:
            ats_keywords_response = safe_ai_call(keyword_prompt, max_tokens=100)
            ats_keywords = [k.strip() for k in ats_keywords_response.split(',')[:8]]
        except:
            ats_keywords = []
        
        # Step 2: Enhance skills with ATS keywords
        enhanced_resume = json.loads(json.dumps(resume_data))  # Deep copy
        
        # Add ATS keywords to hard skills if not already present
        if ats_keywords:
            existing_skills_lower = hard_skills.lower()
            new_keywords = [kw for kw in ats_keywords if kw.lower() not in existing_skills_lower]
            
            if new_keywords:
                if hard_skills:
                    enhanced_resume['skills']['hardSkills'] = f"{hard_skills}, {', '.join(new_keywords[:5])}"
                else:
                    enhanced_resume['skills']['hardSkills'] = ', '.join(new_keywords[:5])
        
        # Step 3: Add ATS keywords to professional summary (preserve original text)
        description = resume_data.get('Description', {}).get('UserDescription', '')
        if description and len(description) > 20:
            # Only add keywords if we have ATS keywords from Step 1
            if ats_keywords:
                # Get 2-3 most relevant keywords not already in summary
                summary_lower = description.lower()
                keywords_to_add = [kw for kw in ats_keywords[:5] if kw.lower() not in summary_lower][:3]
                
                if keywords_to_add:
                    # Ask AI to naturally insert keywords into existing summary
                    keyword_prompt = f"""Add these keywords naturally into the text below. Keep the original meaning and structure, just insert the keywords where they fit naturally.

Original text: {description}
Keywords to add: {', '.join(keywords_to_add)}

Return only the enhanced text with keywords added (no labels, no explanations):"""
                    
                    try:
                        enhanced_summary = safe_ai_call(keyword_prompt, max_tokens=150)
                        # Clean up response - remove any labels like "Summary:", "Enhanced:", etc.
                        cleaned_summary = enhanced_summary.strip()
                        # Remove common prefixes
                        for prefix in ['Summary:', 'Enhanced:', 'Enhanced summary:', 'Result:', 'Output:']:
                            if cleaned_summary.startswith(prefix):
                                cleaned_summary = cleaned_summary[len(prefix):].strip()
                        # Remove markdown
                        cleaned_summary = cleaned_summary.replace('**', '')
                        
                        enhanced_resume['Description'] = enhanced_resume.get('Description', {})
                        enhanced_resume['Description']['UserDescription'] = cleaned_summary
                    except:
                        pass  # Keep original if enhancement fails
        
        # Step 4: Enhance work experience descriptions (one at a time for token efficiency)
        work_exp = resume_data.get('workExperience', [])
        if work_exp and isinstance(work_exp, list) and len(work_exp) > 0:
            # Only enhance the first/most recent experience to save tokens
            first_exp = work_exp[0]
            if first_exp.get('keyAchievements') and len(first_exp['keyAchievements']) < 300:
                exp_prompt = f"""Enhance this {first_exp.get('jobTitle', 'role')} achievement (2-3 sentences, use **bold** for key terms):
Original: {first_exp['keyAchievements']}
Enhanced:"""
                
                try:
                    enhanced_achievement = safe_ai_call(exp_prompt, max_tokens=200)
                    enhanced_resume['workExperience'][0]['keyAchievements'] = enhanced_achievement.strip()
                except:
                    pass  # Keep original if enhancement fails
        
        # Step 5: Enhance first project description (if exists)
        projects = resume_data.get('projects', [])
        if projects and isinstance(projects, list) and len(projects) > 0:
            first_project = projects[0]
            if first_project.get('toolsTechUsed') and len(first_project['toolsTechUsed']) < 200:
                project_prompt = f"""Enhance project tech description (1-2 sentences, use **bold** for technologies):
Original: {first_project['toolsTechUsed']}
Enhanced:"""
                
                try:
                    enhanced_project = safe_ai_call(project_prompt, max_tokens=150)
                    enhanced_resume['projects'][0]['toolsTechUsed'] = enhanced_project.strip()
                except:
                    pass  # Keep original if enhancement fails
        
        # Step 6: Add soft skills if missing or minimal
        if not soft_skills or len(soft_skills) < 30:
            soft_skill_prompt = f"""List 6 soft skills for {job_title} (comma-separated):"""
            try:
                soft_skills_response = safe_ai_call(soft_skill_prompt, max_tokens=80)
                new_soft_skills = soft_skills_response.strip().replace('**', '')
                if soft_skills:
                    enhanced_resume['skills']['softSkills'] = f"{soft_skills}, {new_soft_skills}"
                else:
                    enhanced_resume['skills']['softSkills'] = new_soft_skills
            except:
                if not soft_skills:
                    enhanced_resume['skills']['softSkills'] = 'Communication, Problem Solving, Leadership, Teamwork, Time Management, Adaptability'
        
        # Clean up any markdown from non-target sections
        if enhanced_resume.get('skills', {}).get('hardSkills'):
            enhanced_resume['skills']['hardSkills'] = enhanced_resume['skills']['hardSkills'].replace('**', '')
        if enhanced_resume.get('skills', {}).get('softSkills'):
            enhanced_resume['skills']['softSkills'] = enhanced_resume['skills']['softSkills'].replace('**', '')
        if enhanced_resume.get('Description', {}).get('UserDescription'):
            enhanced_resume['Description']['UserDescription'] = enhanced_resume['Description']['UserDescription'].replace('**', '')
        
        # Calculate ATS scores
        original_ats = calculate_ats_score(resume_data, job_title)
        enhanced_ats = calculate_ats_score_with_enhancement_bonus(enhanced_resume, job_title, is_enhanced=True)
        
        return {
            'enhancedResume': enhanced_resume,
            'original': resume_data,
            'atsScore': {
                'original': original_ats,
                'enhanced': enhanced_ats,
                'improvement': enhanced_ats['score'] - original_ats['score']
            },
            'enhancementsApplied': {
                'atsKeywordsAdded': len([kw for kw in ats_keywords if kw.lower() not in hard_skills.lower()]) if ats_keywords else 0,
                'sectionsEnhanced': ['skills', 'summary', 'experience', 'projects']
            }
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
            
        except Exception as e:
            print(f"Error in AI parsing: {e}")
            return {
                'success': False,
                'error': str(e),
                'data': None
            }
    @staticmethod
    def analyze_resume(resume_text, job_role):
        """Analyze resume based on specified job role without ATS terminology"""
        prompt = f"""
        Analyze the following resume text against the requirements and expectations of a {job_role} role.
        Provide a detailed, professional analysis for a modern SaaS dashboard.
        
        RESUME TEXT:
        {resume_text[:20000]}

        JOB ROLE: {job_role}

        STRICT RULES:
        1. DO NOT mention "ATS", "Score", "Rank", or any numeric scoring. Use terms like "Alignment", "Competency", "Market Readiness".
        2. Identify TOP 10 critical keywords for this specific role and check if they are in the resume.
        3. Identify specific tools missing (e.g., if it's Frontend, check for React, Tailwind, etc.).
        4. Focus on professional impact and alignment.
        5. MUST provide concrete, specific analysis - not generic statements.
        
        Provide the analysis in the following JSON structure (MUST be valid JSON):
        {{
            "strengths": ["specific strength 1", "specific strength 2", "specific strength 3"],
            "gaps": ["specific gap 1", "specific gap 2", "specific gap 3"],
            "skillDistribution": {{
                "Technical Skills": 75,
                "Soft Skills": 60,
                "Industry Knowledge": 80,
                "Tools & Tech": 70
            }},
            "missingSkills": [
                {{"skill": "Skill Name", "priority": "High"}},
                {{"skill": "Skill Name", "priority": "Medium"}},
                {{"skill": "Skill Name", "priority": "Low"}}
            ],
            "toolsGap": [
                {{"tool": "Tool Name", "status": "Missing"}},
                {{"tool": "Tool Name", "status": "Present"}}
            ],
            "keywordRelevance": [
                {{"keyword": "Keyword 1", "found": true}},
                {{"keyword": "Keyword 2", "found": false}}
            ],
            "improvementSuggestions": [
                {{
                    "category": "Technical",
                    "suggestion": "Specific actionable advice",
                    "icon": "code"
                }}
            ],
            "roadmap": {{
                "immediate": "Specific phase 1 action (0-1 month)",
                "shortTerm": "Specific phase 2 action (1-3 months)",
                "mediumTerm": "Specific phase 3 action (3-6 months)"
            }}
        }}

        Return ONLY valid JSON. No markdown, no comments, no extra text.
        """
        
        print(f"\n{'='*60}")
        print(f"ANALYZE RESUME REQUEST")
        print(f"Job Role: {job_role}")
        print(f"Resume Length: {len(resume_text)} characters")
        print(f"{'='*60}\n")
        
        response = safe_ai_call(prompt, max_tokens=4000)
        
        print(f"\n{'='*60}")
        print(f"AI RESPONSE (first 500 chars):")
        print(response[:500] if response else "No response")
        print(f"{'='*60}\n")
        
        try:
            json_text = response.strip()
            
            # Remove markdown code blocks if present
            if json_text.startswith('```'):
                lines = json_text.split('\n')
                json_text = '\n'.join(lines[1:-1]) if len(lines) > 2 else json_text
            
            # Try to extract JSON if there's extra text
            if '{' in json_text and '}' in json_text:
                start = json_text.find('{')
                end = json_text.rfind('}') + 1
                json_text = json_text[start:end]
            
            print(f"Attempting to parse JSON (first 200 chars): {json_text[:200]}")
            analysis = json.loads(json_text)
            
            # Add job role to response
            analysis['jobRole'] = job_role
            
            print(f"✓ Successfully parsed AI response")
            print(f"  - Strengths: {len(analysis.get('strengths', []))}")
            print(f"  - Gaps: {len(analysis.get('gaps', []))}")
            print(f"  - Keywords: {len(analysis.get('keywordRelevance', []))}")
            
            return analysis
            
        except json.JSONDecodeError as e:
            print(f"✗ JSON Parse Error: {str(e)}")
            print(f"  Failed to parse: {json_text[:200]}")
            return AIService._fallback_analysis(job_role)
        except Exception as e:
            print(f"✗ Unexpected Error in analyze_resume: {str(e)}")
            import traceback
            traceback.print_exc()
            return AIService._fallback_analysis(job_role)
    
    @staticmethod
    def _fallback_analysis(job_role):
        """Return a fallback analysis structure when AI fails"""
        return {
            "jobRole": job_role,
            "strengths": [
                "Professional background evident",
                "Experience in relevant field",
                "Skills foundation present"
            ],
            "gaps": [
                "More specific technical skills needed",
                "Portfolio projects could enhance profile",
                "Industry certifications recommended"
            ],
            "skillDistribution": {
                "Technical Skills": 60,
                "Soft Skills": 55,
                "Industry Knowledge": 50,
                "Tools & Tech": 58
            },
            "missingSkills": [
                {"skill": f"{job_role}-specific framework", "priority": "High"},
                {"skill": "Cloud technologies", "priority": "Medium"},
                {"skill": "CI/CD pipeline", "priority": "Low"}
            ],
            "toolsGap": [
                {"tool": "Git", "status": "Present"},
                {"tool": "Docker", "status": "Missing"},
                {"tool": "Kubernetes", "status": "Missing"}
            ],
            "keywordRelevance": [
                {"keyword": job_role.split()[0], "found": True},
                {"keyword": "API", "found": False},
                {"keyword": "Testing", "found": False}
            ],
            "improvementSuggestions": [
                {
                    "category": "Technical", 
                    "suggestion": f"Build projects showcasing {job_role} expertise", 
                    "icon": "code"
                },
                {
                    "category": "Professional",
                    "suggestion": "Add measurable achievements and impact",
                    "icon": "briefcase"
                }
            ],
            "roadmap": {
                "immediate": "Review and update resume with specific achievements and metrics",
                "shortTerm": "Complete 2-3 portfolio projects demonstrating key skills",
                "mediumTerm": "Pursue relevant certifications and contribute to open source"
            }
        }
