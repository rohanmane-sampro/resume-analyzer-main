"""
🔍 GROQ API KEYS VALIDATOR
==========================
Standalone script to check the status of all Groq API keys.
Tests each key independently and shows which ones are working vs rate-limited.

Usage: python check_all_groq_keys.py
"""

import os
from dotenv import load_dotenv
from groq import Groq
import time
from datetime import datetime

# Load environment variables
load_dotenv()

# ANSI color codes for pretty output
class Colors:
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    CYAN = '\033[96m'
    MAGENTA = '\033[95m'
    RESET = '\033[0m'
    BOLD = '\033[1m'

def print_header():
    """Print fancy header"""
    print("\n" + "="*80)
    print(f"{Colors.CYAN}{Colors.BOLD}🔍 GROQ API KEYS VALIDATOR{Colors.RESET}")
    print(f"{Colors.BLUE}Testing all configured Groq API keys...{Colors.RESET}")
    print("="*80 + "\n")

def test_single_key(key_number, api_key):
    """
    Test a single API key with a simple request
    
    Returns:
        dict: Status information about the key
    """
    result = {
        'key_number': key_number,
        'key_preview': f"...{api_key[-8:]}" if len(api_key) > 8 else "***",
        'status': 'unknown',
        'message': '',
        'response_time': 0
    }
    
    try:
        # Initialize client
        client = Groq(api_key=api_key)
        
        # Make a simple test request
        start_time = time.time()
        
        completion = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": "Say 'OK' if you can read this."
                }
            ],
            model="llama-3.1-8b-instant",
            max_tokens=10,
            temperature=0.1
        )
        
        end_time = time.time()
        response_time = round((end_time - start_time) * 1000, 2)  # Convert to ms
        
        # Check if we got a response
        if completion.choices[0].message.content:
            result['status'] = 'working'
            result['message'] = 'Key is active and working'
            result['response_time'] = response_time
        else:
            result['status'] = 'error'
            result['message'] = 'No response received'
            
    except Exception as e:
        error_msg = str(e).lower()
        
        # Check for specific error types
        if 'rate_limit' in error_msg or 'rate limit' in error_msg or '429' in error_msg:
            result['status'] = 'rate_limited'
            result['message'] = 'Rate limit reached - wait before using'
        elif 'invalid' in error_msg or 'authentication' in error_msg or '401' in error_msg:
            result['status'] = 'invalid'
            result['message'] = 'Invalid or expired API key'
        elif 'quota' in error_msg or 'exceeded' in error_msg:
            result['status'] = 'quota_exceeded'
            result['message'] = 'Quota exceeded for this key'
        else:
            result['status'] = 'error'
            result['message'] = f'Error: {str(e)[:50]}'
    
    return result

def print_result(result):
    """Print formatted result for a single key"""
    key_num = result['key_number']
    key_preview = result['key_preview']
    status = result['status']
    message = result['message']
    response_time = result['response_time']
    
    # Status icon and color
    if status == 'working':
        icon = "✅"
        color = Colors.GREEN
        status_text = "WORKING"
    elif status == 'rate_limited':
        icon = "⏳"
        color = Colors.YELLOW
        status_text = "RATE LIMITED"
    elif status == 'quota_exceeded':
        icon = "🚫"
        color = Colors.RED
        status_text = "QUOTA EXCEEDED"
    elif status == 'invalid':
        icon = "❌"
        color = Colors.RED
        status_text = "INVALID KEY"
    else:
        icon = "⚠️"
        color = Colors.YELLOW
        status_text = "ERROR"
    
    # Print formatted line
    print(f"{icon} {Colors.BOLD}Key #{key_num:2d}{Colors.RESET} ({key_preview}) - "
          f"{color}{Colors.BOLD}{status_text:15s}{Colors.RESET} - {message}", end="")
    
    if response_time > 0:
        print(f" ({response_time}ms)")
    else:
        print()

def main():
    """Main function to test all keys"""
    print_header()
    
    # Load all keys
    print(f"{Colors.BLUE}📥 Loading API keys from .env file...{Colors.RESET}\n")
    
    keys = []
    for i in range(1, 51):  # Check up to 50 keys
        key = os.getenv(f'GROQ_API_KEY_{i}')
        if key:
            keys.append((i, key.strip()))
    
    if not keys:
        print(f"{Colors.RED}❌ No GROQ_API_KEY_X found in .env file!{Colors.RESET}")
        print(f"\n{Colors.YELLOW}💡 Add keys to your .env file like this:{Colors.RESET}")
        print("   GROQ_API_KEY_1=your_key_here")
        print("   GROQ_API_KEY_2=your_key_here")
        return
    
    print(f"{Colors.GREEN}✅ Found {len(keys)} API key(s) to test{Colors.RESET}\n")
    print("="*80)
    print(f"{Colors.BOLD}Testing each key... (this may take a minute){Colors.RESET}")
    print("="*80 + "\n")
    
    # Test each key
    results = []
    for key_num, api_key in keys:
        print(f"Testing Key #{key_num}... ", end="", flush=True)
        result = test_single_key(key_num, api_key)
        results.append(result)
        print(f"\r", end="")  # Clear the "Testing..." line
        print_result(result)
        time.sleep(0.5)  # Small delay to avoid hammering the API
    
    # Summary
    print("\n" + "="*80)
    print(f"{Colors.CYAN}{Colors.BOLD}📊 SUMMARY{Colors.RESET}")
    print("="*80 + "\n")
    
    working = [r for r in results if r['status'] == 'working']
    rate_limited = [r for r in results if r['status'] == 'rate_limited']
    quota_exceeded = [r for r in results if r['status'] == 'quota_exceeded']
    invalid = [r for r in results if r['status'] == 'invalid']
    errors = [r for r in results if r['status'] == 'error']
    
    print(f"  {Colors.GREEN}✅ Working Keys:{Colors.RESET}        {len(working):2d} / {len(keys)}")
    print(f"  {Colors.YELLOW}⏳ Rate Limited:{Colors.RESET}       {len(rate_limited):2d} / {len(keys)}")
    print(f"  {Colors.RED}🚫 Quota Exceeded:{Colors.RESET}     {len(quota_exceeded):2d} / {len(keys)}")
    print(f"  {Colors.RED}❌ Invalid Keys:{Colors.RESET}        {len(invalid):2d} / {len(keys)}")
    print(f"  {Colors.YELLOW}⚠️  Errors:{Colors.RESET}             {len(errors):2d} / {len(keys)}")
    
    print("\n" + "="*80)
    
    # Recommendations
    if len(working) > 0:
        print(f"\n{Colors.GREEN}✅ You have {len(working)} working key(s) available!{Colors.RESET}")
        avg_response = sum(r['response_time'] for r in working) / len(working)
        print(f"   Average response time: {avg_response:.2f}ms")
    
    if len(rate_limited) > 0:
        print(f"\n{Colors.YELLOW}⏳ {len(rate_limited)} key(s) are rate-limited. Wait a few minutes and try again.{Colors.RESET}")
    
    if len(invalid) > 0:
        print(f"\n{Colors.RED}❌ {len(invalid)} key(s) are invalid. Check these keys in your Groq console.{Colors.RESET}")
        print(f"   Invalid keys: {', '.join([f'#{r['key_number']}' for r in invalid])}")
    
    # Estimated capacity
    if len(working) > 0:
        daily_capacity = len(working) * 14400  # Approximate free tier per key per day
        monthly_capacity = daily_capacity * 30
        print(f"\n{Colors.CYAN}📈 Estimated Capacity (Free Tier):{Colors.RESET}")
        print(f"   Daily:   ~{daily_capacity:,} requests")
        print(f"   Monthly: ~{monthly_capacity:,} requests")
    
    print("\n" + "="*80)
    print(f"{Colors.BLUE}Test completed at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}{Colors.RESET}")
    print("="*80 + "\n")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print(f"\n\n{Colors.YELLOW}⚠️  Test interrupted by user{Colors.RESET}\n")
    except Exception as e:
        print(f"\n{Colors.RED}❌ Unexpected error: {e}{Colors.RESET}\n")
