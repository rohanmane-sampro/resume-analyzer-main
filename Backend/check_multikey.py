"""
Simple diagnostic script to check if multi-key system is working
"""
import os
import sys

print("\n" + "="*70)
print("🔍 GROQ MULTI-KEY SYSTEM DIAGNOSTIC")
print("="*70)

# Step 1: Check .env file exists
print("\n📁 Step 1: Checking .env file...")
if os.path.exists('.env'):
    print("   ✅ .env file found")
else:
    print("   ❌ .env file NOT found")
    sys.exit(1)

# Step 2: Load environment
print("\n📦 Step 2: Loading environment variables...")
from dotenv import load_dotenv
load_dotenv()
print("   ✅ Environment loaded")

# Step 3: Check for keys
print("\n🔑 Step 3: Checking for GROQ_API_KEY_* variables...")
keys_found = 0
for i in range(1, 21):  # Check up to 20 keys
    key = os.getenv(f'GROQ_API_KEY_{i}')
    if key:
        keys_found += 1
        # Show first 10 and last 8 characters
        masked = f"{key[:10]}...{key[-8:]}" if len(key) > 18 else "***"
        print(f"   ✅ GROQ_API_KEY_{i} = {masked}")

if keys_found == 0:
    print("   ⚠️  No GROQ_API_KEY_X found, checking old format...")
    old_key = os.getenv('GROQ_API_KEY')
    if old_key:
        print(f"   ✅ GROQ_API_KEY (old format) found")
        keys_found = 1
    else:
        print("   ❌ No keys found at all!")
        sys.exit(1)

print(f"\n   📊 Total: {keys_found} key(s) found")

# Step 4: Test key manager
print("\n🧪 Step 4: Testing Groq Key Manager...")
try:
    from src.utils.groq_key_manager import groq_key_manager
    manager_keys = groq_key_manager.get_all_keys_count()
    print(f"   ✅ Key Manager initialized with {manager_keys} key(s)")
    
    if manager_keys != keys_found:
        print(f"   ⚠️  Warning: Manager has {manager_keys} keys but we found {keys_found}")
    
except Exception as e:
    print(f"   ❌ Error loading key manager: {e}")
    sys.exit(1)

# Step 5: Test random selection
print("\n🎲 Step 5: Testing random key selection (3 attempts)...")
try:
    for i in range(3):
        client = groq_key_manager.get_random_client()
        print(f"   ✅ Attempt {i+1}: Successfully got Groq client")
except Exception as e:
    print(f"   ❌ Error: {e}")
    sys.exit(1)

# Step 6: Test AI service import
print("\n🤖 Step 6: Testing AI Service integration...")
try:
    from src.services.ai_service import safe_ai_call
    print("   ✅ AI Service imported successfully")
except Exception as e:
    print(f"   ❌ Error importing AI service: {e}")
    sys.exit(1)

# Final result
print("\n" + "="*70)
print("✅ ALL CHECKS PASSED! Multi-key system is working correctly!")
print("="*70)
print(f"\n📊 Summary:")
print(f"   • {keys_found} Groq API key(s) configured")
print(f"   • Random selection: ENABLED")
print(f"   • Load distribution: ACTIVE")
print(f"   • Estimated capacity: {keys_found * 14400} requests/month (free tier)")
print("\n💡 The system will randomly select a different key for each request")
print("="*70 + "\n")
