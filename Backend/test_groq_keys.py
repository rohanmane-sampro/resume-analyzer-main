import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

print("=" * 60)
print("🔍 GROQ API KEYS CHECK")
print("=" * 60)

# Check for keys
found_keys = []
i = 1
while True:
    key = os.getenv(f'GROQ_API_KEY_{i}')
    if not key:
        break
    found_keys.append(f"GROQ_API_KEY_{i}")
    print(f"✅ Found: GROQ_API_KEY_{i} = ...{key[-8:]}")
    i += 1

# Check old single key
old_key = os.getenv('GROQ_API_KEY')
if old_key:
    print(f"✅ Found: GROQ_API_KEY (old format) = ...{old_key[-8:]}")

print("=" * 60)
print(f"📊 Total keys found: {len(found_keys)}")
print("=" * 60)

if len(found_keys) == 0 and not old_key:
    print("❌ NO KEYS FOUND!")
    print("\n💡 Please add keys to your .env file:")
    print("   GROQ_API_KEY_1=your_key_here")
    print("   GROQ_API_KEY_2=your_key_here")
else:
    print("✅ Keys are configured correctly!")
    
    # Test the key manager
    print("\n🧪 Testing Key Manager...")
    try:
        from src.utils.groq_key_manager import groq_key_manager
        print(f"✅ Key Manager loaded {groq_key_manager.get_all_keys_count()} key(s)")
        
        # Test getting a random client
        print("\n🎲 Testing random key selection...")
        for i in range(3):
            client = groq_key_manager.get_random_client()
            print(f"   Test {i+1}: Got client successfully")
        
        print("\n✅ ALL TESTS PASSED! Multi-key system is working!")
        
    except Exception as e:
        print(f"❌ Error: {e}")
