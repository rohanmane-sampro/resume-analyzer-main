"""
Test script to verify summary enhancement only adds ATS keywords
without completely rewriting the original text
"""
import requests
import json

# Test data with a specific summary
test_resume = {
    "contactInfo": {
        "fullName": "John Doe",
        "emailAddress": "john@example.com",
        "phoneNumber": "1234567890",
        "jobTitle": "Data Analyst Intern"
    },
    "skills": {
        "hardSkills": "Excel, SQL",
        "softSkills": "Communication"
    },
    "Description": {
        "UserDescription": "Data Analyst Intern with proven expertise in relevant technologies. Delivered high-impact solutions driving measurable business results. Specialized in data-driven decision making and process optimization."
    },
    "workExperience": [{
        "jobTitle": "Data Analyst Intern",
        "companyName": "Tech Corp",
        "WorkDuration": "2023-Present",
        "keyAchievements": "Analyzed data and created reports."
    }],
    "projects": [{
        "projectTitle": "Sales Dashboard",
        "toolsTechUsed": "Excel, Power BI"
    }],
    "education": [],
    "certificates": []
}

# API endpoint
url = "http://localhost:5000/complete-resume"

print("Testing Summary Enhancement (Keywords Only)...")
print("=" * 70)

original_summary = test_resume['Description']['UserDescription']
print(f"\n📝 ORIGINAL SUMMARY:")
print(f"   {original_summary}")
print(f"   Length: {len(original_summary)} characters")

try:
    # Make request
    response = requests.post(
        url,
        json={"resumeData": test_resume},
        headers={"Content-Type": "application/json"},
        timeout=30
    )
    
    if response.status_code == 200:
        data = response.json()
        
        if 'enhancedResume' in data:
            enhanced_summary = data['enhancedResume'].get('Description', {}).get('UserDescription', '')
            
            print(f"\n✨ ENHANCED SUMMARY:")
            print(f"   {enhanced_summary}")
            print(f"   Length: {len(enhanced_summary)} characters")
            
            # Check if original text is preserved
            original_words = set(original_summary.lower().split())
            enhanced_words = set(enhanced_summary.lower().split())
            
            # Calculate word overlap
            common_words = original_words.intersection(enhanced_words)
            preservation_rate = (len(common_words) / len(original_words)) * 100
            
            print(f"\n📊 ANALYSIS:")
            print(f"   Word Preservation: {preservation_rate:.1f}%")
            
            # Find new keywords added
            new_words = enhanced_words - original_words
            if new_words:
                print(f"   Keywords Added: {', '.join(sorted(new_words))}")
            
            # Check ATS score improvement
            if 'atsScore' in data:
                original_score = data['atsScore']['original']['score']
                enhanced_score = data['atsScore']['enhanced']['score']
                improvement = data['atsScore']['improvement']
                print(f"\n📈 ATS SCORE:")
                print(f"   Original: {original_score}")
                print(f"   Enhanced: {enhanced_score}")
                print(f"   Improvement: +{improvement} points")
            
            # Verify enhancement quality
            if preservation_rate >= 70:
                print(f"\n✅ SUCCESS! Original text preserved ({preservation_rate:.1f}% match)")
                print("   Summary was enhanced with keywords, not completely rewritten!")
            else:
                print(f"\n⚠️  WARNING: Text significantly changed ({preservation_rate:.1f}% match)")
                print("   Summary may have been rewritten instead of just adding keywords")
        
    else:
        print(f"\n❌ ERROR: {response.status_code}")
        print(response.text)
        
except requests.exceptions.ConnectionError:
    print("\n❌ ERROR: Cannot connect to backend")
    print("Make sure the backend is running on http://localhost:5000")
except Exception as e:
    print(f"\n❌ ERROR: {str(e)}")

print("\n" + "=" * 70)
