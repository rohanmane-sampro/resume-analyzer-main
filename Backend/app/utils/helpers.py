import json

def create_fallback_enhancement(resume_data, job_title):
    """Create enhanced resume when AI response can't be parsed"""
    enhanced = json.loads(json.dumps(resume_data))  # Deep copy
    
    # Enhance contact info
    if not enhanced.get('contactInfo', {}).get('jobTitle'):
        enhanced.setdefault('contactInfo', {})['jobTitle'] = job_title
    
    # Enhance description - NO MARKDOWN
    enhanced.setdefault('Description', {})['UserDescription'] = f"Experienced {job_title} with proven expertise in delivering results. Strong problem-solving and collaboration skills."
    
    # Enhance skills - NO MARKDOWN, CONCISE LISTS
    skills = enhanced.setdefault('skills', {})
    if not skills.get('hardSkills') or len(skills.get('hardSkills', '')) < 20:
        if 'developer' in job_title.lower():
            skills['hardSkills'] = "JavaScript, Python, React, Node.js, Git, SQL"
        else:
            skills['hardSkills'] = "Microsoft Office, Data Analysis, Communication, Problem Solving"
    
    if not skills.get('softSkills') or len(skills.get('softSkills', '')) < 20:
        skills['softSkills'] = "Leadership, Communication, Teamwork, Time Management, Adaptability"
    
    # Enhance work experience
    if enhanced.get('workExperience') and isinstance(enhanced['workExperience'], list):
        for exp in enhanced['workExperience']:
            if exp.get('keyAchievements') and len(exp['keyAchievements']) < 100:
                exp['keyAchievements'] = f"Responsible for driving results and contributing to organizational success. **Delivered** high-quality work exceeding expectations."
    
    return enhanced
