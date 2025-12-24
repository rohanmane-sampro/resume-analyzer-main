import os
from flask import current_app

groq_client = None
gemini_configured = False

def init_ai_client(api_key):
    global groq_client
    if api_key:
        try:
            from groq import Groq
            groq_client = Groq(api_key=api_key)
            print("SUCCESS: Groq AI configured (Primary)")
        except ImportError:
            print("WARNING: 'groq' package not installed. Run 'pip install groq'")
    else:
        print("INFO: GROQ_API_KEY not found. Checking Gemini...")

def init_gemini_client():
    global gemini_configured
    api_key = current_app.config.get('GEMINI_API_KEY')
    if api_key:
        try:
            import google.generativeai as genai
            genai.configure(api_key=api_key)
            gemini_configured = True
            print("SUCCESS: Gemini AI configured (Secondary/Fallback)")
        except ImportError:
            print("WARNING: 'google-generativeai' not installed. Run 'pip install google-generativeai'")
    else:
        print("INFO: GEMINI_API_KEY not found.")

def safe_ai_call(prompt, max_retries=3):
    """Safely call AI using Groq or Gemini"""
    global groq_client
    
    # Lazy initialization if not already done
    if not groq_client and not gemini_configured:
        init_ai_client(current_app.config.get('GROQ_API_KEY'))
        init_gemini_client()
    
    # Try Groq first
    if groq_client:
        for attempt in range(max_retries):
            try:
                # print(f"Attempt {attempt + 1}: Making Groq AI call...")
                completion = groq_client.chat.completions.create(
                    messages=[{"role": "user", "content": prompt}],
                    model="llama3-70b-8192",
                    temperature=0.7,
                    max_tokens=4096,
                )
                response = completion.choices[0].message.content
                if response: return response
            except Exception as e:
                print(f"Groq call failed (Att {attempt+1}): {str(e)}")
    
    # Fallback to Gemini
    if gemini_configured:
        print("Falling back to Gemini...")
        try:
            import google.generativeai as genai
            model = genai.GenerativeModel('gemini-1.5-flash')
            response = model.generate_content(prompt)
            if response and response.text:
                return response.text
        except Exception as e:
            print(f"Gemini call failed: {str(e)}")
            return f"AI Service Error: Gemini failed: {str(e)}"

    return "AI Error: No AI providers configured (Groq or Gemini). Check .env."
