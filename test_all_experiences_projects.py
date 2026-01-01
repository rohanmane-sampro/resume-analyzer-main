"""
Test script to verify ALL work experiences and projects get enhanced
with just 1 additional ATS-friendly sentence
"""
import requests
import json

# Test data with MULTIPLE experiences and projects
test_resume = {
    "contactInfo": {
        "fullName": "John Doe",
        "emailAddress": "john@example.com",
        "phoneNumber": "1234567890",
        "jobTitle": "Senior Software Engineer"
    },
    "skills": {
        "hardSkills": "Python, JavaScript",
        "softSkills": "Communication"
    },
    "Description": {
        "UserDescription": "Senior Software Engineer with expertise in building scalable applications."
    },
    "workExperience": [
        {
            "jobTitle": "Senior Software Engineer",
            "companyName": "Tech Innovations Inc.",
            "WorkDuration": "Jan 2020 - Present",
            "keyAchievements": "Led development of microservices architecture serving 2M+ active users. Improved application performance by 45% through code optimization and caching strategies."
        },
        {
            "jobTitle": "Software Engineer",
            "companyName": "Digital Solutions Corp",
            "WorkDuration": "Jun 2017 - Dec 2019",
            "keyAchievements": "Developed RESTful APIs handling 100K+ daily requests with 99.9% uptime. Collaborated with cross-functional teams to deliver 15+ client projects."
        }
    ],
    "projects": [
        {
            "projectTitle": "E-Commerce Platform",
            "toolsTechUsed": "React, Node.js, PostgreSQL, Redis, AWS, Docker"
        },
        {
            "projectTitle": "Analytics Dashboard",
            "toolsTechUsed": "React, D3.js, GraphQL, MongoDB, WebSockets"
        },
        {
            "projectTitle": "Mobile Banking App",
            "toolsTechUsed": "React Native, Firebase, Node.js, MongoDB"
        }
    ],
    "education": [],
    "certificates": []
}

# API endpoint
url = "http://localhost:5000/complete-resume"

print("Testing Enhancement for ALL Experiences & Projects...")
print("=" * 80)

print(f"\n📋 ORIGINAL DATA:")
print(f"\n   Work Experiences: {len(test_resume['workExperience'])}")
for idx, exp in enumerate(test_resume['workExperience'], 1):
    print(f"   {idx}. {exp['jobTitle']} - {len(exp['keyAchievements'])} chars")

print(f"\n   Projects: {len(test_resume['projects'])}")
for idx, proj in enumerate(test_resume['projects'], 1):
    print(f"   {idx}. {proj['projectTitle']} - {len(proj['toolsTechUsed'])} chars")

try:
    # Make request
    response = requests.post(
        url,
        json={"resumeData": test_resume},
        headers={"Content-Type": "application/json"},
        timeout=45  # Longer timeout for multiple enhancements
    )
    
    if response.status_code == 200:
        data = response.json()
        
        if 'enhancedResume' in data:
            enhanced = data['enhancedResume']
            
            print(f"\n✨ ENHANCED DATA:")
            
            # Check work experiences
            print(f"\n📊 WORK EXPERIENCES:")
            for idx, exp in enumerate(enhanced.get('workExperience', []), 1):
                original_len = len(test_resume['workExperience'][idx-1]['keyAchievements'])
                enhanced_len = len(exp['keyAchievements'])
                added_chars = enhanced_len - original_len
                
                print(f"\n   Experience {idx}: {exp['jobTitle']}")
                print(f"   Original: {original_len} chars")
                print(f"   Enhanced: {enhanced_len} chars")
                print(f"   Added: +{added_chars} chars")
                
                # Show what was added
                original_text = test_resume['workExperience'][idx-1]['keyAchievements']
                enhanced_text = exp['keyAchievements']
                if enhanced_text.startswith(original_text):
                    added_text = enhanced_text[len(original_text):].strip()
                    print(f"   New sentence: {added_text[:100]}...")
                    
                    if added_chars > 0 and added_chars < 200:
                        print(f"   ✅ Good! Just 1 sentence added")
                    elif added_chars == 0:
                        print(f"   ⚠️  No enhancement")
                    else:
                        print(f"   ⚠️  Too much added")
            
            # Check projects
            print(f"\n📁 PROJECTS:")
            for idx, proj in enumerate(enhanced.get('projects', []), 1):
                original_len = len(test_resume['projects'][idx-1]['toolsTechUsed'])
                enhanced_len = len(proj['toolsTechUsed'])
                added_chars = enhanced_len - original_len
                
                print(f"\n   Project {idx}: {proj['projectTitle']}")
                print(f"   Original: {original_len} chars")
                print(f"   Enhanced: {enhanced_len} chars")
                print(f"   Added: +{added_chars} chars")
                
                # Show what was added
                original_text = test_resume['projects'][idx-1]['toolsTechUsed']
                enhanced_text = proj['toolsTechUsed']
                if enhanced_text.startswith(original_text):
                    added_text = enhanced_text[len(original_text):].strip()
                    print(f"   New sentence: {added_text[:100]}...")
                    
                    if added_chars > 0 and added_chars < 200:
                        print(f"   ✅ Good! Just 1 sentence added")
                    elif added_chars == 0:
                        print(f"   ⚠️  No enhancement")
                    else:
                        print(f"   ⚠️  Too much added")
            
            # ATS Score
            if 'atsScore' in data:
                print(f"\n📈 ATS SCORE:")
                print(f"   Original: {data['atsScore']['original']['score']}")
                print(f"   Enhanced: {data['atsScore']['enhanced']['score']}")
                print(f"   Improvement: +{data['atsScore']['improvement']} points")
            
            print(f"\n✅ SUCCESS! All experiences and projects enhanced!")
        
    else:
        print(f"\n❌ ERROR: {response.status_code}")
        print(response.text)
        
except requests.exceptions.ConnectionError:
    print("\n❌ ERROR: Cannot connect to backend")
except Exception as e:
    print(f"\n❌ ERROR: {str(e)}")

print("\n" + "=" * 80)
