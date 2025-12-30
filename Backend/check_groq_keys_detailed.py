"""
🔍 GROQ API KEYS VALIDATOR - WITH FILE OUTPUT
==============================================
Standalone script to check the status of all Groq API keys.
Tests each key independently and shows which ones are working vs rate-limited.
Saves results to a file for easy viewing.

Usage: python check_groq_keys_detailed.py
"""

import os
from dotenv import load_dotenv
from groq import Groq
import time
from datetime import datetime

# Load environment variables
load_dotenv()

def test_single_key(key_number, api_key):
    """Test a single API key with a simple request"""
    result = {
        'key_number': key_number,
        'key_preview': f"...{api_key[-8:]}" if len(api_key) > 8 else "***",
        'status': 'unknown',
        'message': '',
        'response_time': 0
    }
    
    try:
        client = Groq(api_key=api_key)
        start_time = time.time()
        
        completion = client.chat.completions.create(
            messages=[{"role": "user", "content": "Say 'OK' if you can read this."}],
            model="llama-3.1-8b-instant",
            max_tokens=10,
            temperature=0.1
        )
        
        end_time = time.time()
        response_time = round((end_time - start_time) * 1000, 2)
        
        if completion.choices[0].message.content:
            result['status'] = 'working'
            result['message'] = 'Key is active and working'
            result['response_time'] = response_time
        else:
            result['status'] = 'error'
            result['message'] = 'No response received'
            
    except Exception as e:
        error_msg = str(e).lower()
        
        if 'rate_limit' in error_msg or '429' in error_msg:
            result['status'] = 'rate_limited'
            result['message'] = 'Rate limit reached'
        elif 'invalid' in error_msg or '401' in error_msg:
            result['status'] = 'invalid'
            result['message'] = 'Invalid or expired API key'
        elif 'quota' in error_msg or 'exceeded' in error_msg:
            result['status'] = 'quota_exceeded'
            result['message'] = 'Quota exceeded'
        else:
            result['status'] = 'error'
            result['message'] = f'Error: {str(e)[:50]}'
    
    return result

def main():
    """Main function to test all keys"""
    output_lines = []
    
    # Header
    output_lines.append("=" * 80)
    output_lines.append("🔍 GROQ API KEYS VALIDATION REPORT")
    output_lines.append(f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    output_lines.append("=" * 80)
    output_lines.append("")
    
    # Load keys
    keys = []
    for i in range(1, 51):
        key = os.getenv(f'GROQ_API_KEY_{i}')
        if key:
            keys.append((i, key.strip()))
    
    if not keys:
        output_lines.append("❌ No GROQ_API_KEY_X found in .env file!")
        print("\n".join(output_lines))
        return
    
    output_lines.append(f"📥 Found {len(keys)} API key(s) to test")
    output_lines.append("")
    output_lines.append("=" * 80)
    output_lines.append("TESTING RESULTS")
    output_lines.append("=" * 80)
    output_lines.append("")
    
    # Test each key
    results = []
    for key_num, api_key in keys:
        print(f"Testing Key #{key_num}...", flush=True)
        result = test_single_key(key_num, api_key)
        results.append(result)
        
        # Format result
        status_icon = {
            'working': '✅',
            'rate_limited': '⏳',
            'quota_exceeded': '🚫',
            'invalid': '❌',
            'error': '⚠️'
        }.get(result['status'], '?')
        
        line = f"{status_icon} Key #{result['key_number']:2d} ({result['key_preview']}) - "
        line += f"{result['status'].upper():15s} - {result['message']}"
        
        if result['response_time'] > 0:
            line += f" ({result['response_time']}ms)"
        
        output_lines.append(line)
        time.sleep(0.5)
    
    # Summary
    output_lines.append("")
    output_lines.append("=" * 80)
    output_lines.append("📊 SUMMARY")
    output_lines.append("=" * 80)
    output_lines.append("")
    
    working = [r for r in results if r['status'] == 'working']
    rate_limited = [r for r in results if r['status'] == 'rate_limited']
    quota_exceeded = [r for r in results if r['status'] == 'quota_exceeded']
    invalid = [r for r in results if r['status'] == 'invalid']
    errors = [r for r in results if r['status'] == 'error']
    
    output_lines.append(f"  ✅ Working Keys:        {len(working):2d} / {len(keys)}")
    output_lines.append(f"  ⏳ Rate Limited:       {len(rate_limited):2d} / {len(keys)}")
    output_lines.append(f"  🚫 Quota Exceeded:     {len(quota_exceeded):2d} / {len(keys)}")
    output_lines.append(f"  ❌ Invalid Keys:        {len(invalid):2d} / {len(keys)}")
    output_lines.append(f"  ⚠️  Errors:             {len(errors):2d} / {len(keys)}")
    output_lines.append("")
    
    # Working keys list
    if working:
        output_lines.append(f"✅ WORKING KEYS: {', '.join([f'#{r['key_number']}' for r in working])}")
        avg_response = sum(r['response_time'] for r in working) / len(working)
        output_lines.append(f"   Average response time: {avg_response:.2f}ms")
        output_lines.append("")
    
    # Rate limited keys
    if rate_limited:
        output_lines.append(f"⏳ RATE LIMITED KEYS: {', '.join([f'#{r['key_number']}' for r in rate_limited])}")
        output_lines.append("   Wait a few minutes before using these keys")
        output_lines.append("")
    
    # Invalid keys
    if invalid:
        output_lines.append(f"❌ INVALID KEYS: {', '.join([f'#{r['key_number']}' for r in invalid])}")
        output_lines.append("   Check these keys in your Groq console")
        output_lines.append("")
    
    # Capacity estimate
    if working:
        daily_capacity = len(working) * 14400
        monthly_capacity = daily_capacity * 30
        output_lines.append("📈 ESTIMATED CAPACITY (Free Tier):")
        output_lines.append(f"   Daily:   ~{daily_capacity:,} requests")
        output_lines.append(f"   Monthly: ~{monthly_capacity:,} requests")
        output_lines.append("")
    
    output_lines.append("=" * 80)
    
    # Print to console
    full_output = "\n".join(output_lines)
    print("\n" + full_output)
    
    # Save to file
    filename = f"groq_keys_report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.txt"
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(full_output)
    
    print(f"\n💾 Report saved to: {filename}\n")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n⚠️  Test interrupted by user\n")
    except Exception as e:
        print(f"\n❌ Unexpected error: {e}\n")
