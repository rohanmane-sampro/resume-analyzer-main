import requests
import sys

def test_connection():
    print("Testing Backend Connection...")
    try:
        # Test Health Endpoint
        response = requests.get('http://localhost:5000/health')
        if response.status_code == 200:
            data = response.json()
            print("✓ Backend is reachable")
            print(f"  Status: {data.get('status')}")
            print(f"  AI Configured: {data.get('ai_configured')}")
            
            if data.get('ai_configured'):
                print("\nTesting AI Response...")
                ai_response = requests.get('http://localhost:5000/test-ai')
                if ai_response.status_code == 200:
                    print("✓ AI Response Received:")
                    print(f"  {ai_response.json().get('response')}")
                    return True
                else:
                    print("✗ AI Test Failed")
                    print(ai_response.text)
            else:
                print("\n⚠ AI is NOT configured. Please check backend/.env file.")
                return False
        else:
            print(f"✗ Backend returned status code: {response.status_code}")
            return False
            
    except requests.exceptions.ConnectionError:
        print("✗ Could not connect to http://localhost:5000")
        print("  Make sure 'python run.py' is running in the backend folder.")
        return False
    except Exception as e:
        print(f"✗ An error occurred: {str(e)}")
        return False

if __name__ == "__main__":
    success = test_connection()
    sys.exit(0 if success else 1)
