import requests
import json

BASE_URL = "http://localhost:5000/api/auth"

def test_auth():
    print("Testing Authentication...")
    
    # 1. Register
    email = "testuser@example.com"
    password = "password123"
    name = "Test User"
    
    print(f"\n1. Registering user: {email}")
    try:
        res = requests.post(f"{BASE_URL}/register", json={
            "name": name,
            "email": email,
            "password": password
        })
        print(f"Status: {res.status_code}")
        print(f"Response: {res.json()}")
    except Exception as e:
        print(f"Registration failed (might already exist): {e}")

    # 2. Login
    print(f"\n2. Logging in user: {email}")
    token = None
    try:
        res = requests.post(f"{BASE_URL}/login", json={
            "email": email,
            "password": password
        })
        print(f"Status: {res.status_code}")
        if res.status_code == 200:
            data = res.json()
            token = data.get('token')
            print("Login Successful. Token received.")
        else:
            print(f"Login Failed: {res.json()}")
    except Exception as e:
        print(f"Login error: {e}")

    if not token:
        print("Skipping protected route test due to login failure.")
        return

    # 3. Protected Route
    print(f"\n3. Accessing Protected Route (/me)")
    try:
        res = requests.get(f"{BASE_URL}/me", headers={
            "Authorization": f"Bearer {token}"
        })
        print(f"Status: {res.status_code}")
        print(f"Response: {res.json()}")
    except Exception as e:
        print(f"Protected route error: {e}")

if __name__ == "__main__":
    test_auth()
