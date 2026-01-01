"""
Test script to verify AI enhancement endpoint is working
"""
import requests
import json

# Test data - minimal resume
test_resume = {
    "contactInfo": {
        "fullName": "John Doe",
        "emailAddress": "john@example.com",
        "phoneNumber": "1234567890",
        "jobTitle": "Software Engineer"
    },
    "skills": {
        "hardSkills": "Python, JavaScript",
        "softSkills": "Communication"
    },
    "Description": {
        "UserDescription": "I am a software engineer with experience in web development."
    },
    "workExperience": [{
        "jobTitle": "Software Developer",
        "companyName": "Tech Corp",
        "WorkDuration": "2020-2023",
        "keyAchievements": "Developed web applications using modern frameworks."
    }],
    "projects": [{
        "projectTitle": "E-commerce Platform",
        "toolsTechUsed": "React, Node.js, MongoDB"
    }],
    "education": [],
    "certificates": []
}

# API endpoint
url = "http://localhost:5000/complete-resume"

print("Testing AI Enhancement Endpoint...")
print("=" * 50)

try:
    # Make request
    response = requests.post(
        url,
        json={"resumeData": test_resume},
        headers={"Content-Type": "application/json"},
        timeout=30
    )
    
    print(f"Status Code: {response.status_code}")
    
    if response.status_code == 200:
        data = response.json()
        print("\n✅ SUCCESS! AI Enhancement is working!")
        print("\n📊 ATS Score Improvement:")
        if 'atsScore' in data:
            original_score = data['atsScore']['original']['score']
            enhanced_score = data['atsScore']['enhanced']['score']
            improvement = data['atsScore']['improvement']
            print(f"   Original: {original_score}")
            print(f"   Enhanced: {enhanced_score}")
            print(f"   Improvement: +{improvement} points")
        
        if 'enhancementsApplied' in data:
            print(f"\n🎯 Keywords Added: {data['enhancementsApplied']['atsKeywordsAdded']}")
            print(f"📝 Sections Enhanced: {', '.join(data['enhancementsApplied']['sectionsEnhanced'])}")
        
        # Show enhanced skills
        if 'enhancedResume' in data:
            enhanced_skills = data['enhancedResume'].get('skills', {}).get('hardSkills', '')
            original_skills = test_resume['skills']['hardSkills']
            print(f"\n💡 Skills Enhancement:")
            print(f"   Original: {original_skills}")
            print(f"   Enhanced: {enhanced_skills}")
    else:
        print(f"\n❌ ERROR: {response.status_code}")
        print(response.text)
        
except requests.exceptions.ConnectionError:
    print("\n❌ ERROR: Cannot connect to backend")
    print("Make sure the backend is running on http://localhost:5000")
except Exception as e:
    print(f"\n❌ ERROR: {str(e)}")

print("\n" + "=" * 50)
