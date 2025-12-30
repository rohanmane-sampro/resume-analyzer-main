import os
import random
from groq import Groq

class GroqKeyManager:
    """
    Manages multiple Groq API keys for load distribution and rate limit avoidance.
    Randomly selects a key for each request to distribute load across multiple free-tier accounts.
    """
    
    def __init__(self):
        """Load all GROQ_API_KEY_* from environment variables"""
        self.api_keys = []
        
        # Load keys from GROQ_API_KEY_1, GROQ_API_KEY_2, etc.
        i = 1
        while True:
            key = os.getenv(f'GROQ_API_KEY_{i}')
            if not key:
                break
            self.api_keys.append(key.strip())
            i += 1
        
        # Fallback to single key for backward compatibility
        if not self.api_keys:
            single_key = os.getenv('GROQ_API_KEY')
            if single_key:
                self.api_keys = [single_key.strip()]
        
        if not self.api_keys:
            raise ValueError("❌ No Groq API keys found in environment! Please set GROQ_API_KEY_1, GROQ_API_KEY_2, etc.")
        
        print(f"✅ Groq Key Manager initialized with {len(self.api_keys)} API key(s)")
    
    def get_random_client(self):
        """
        Get Groq client with randomly selected API key.
        This distributes load across all available keys.
        
        Returns:
            Groq: Initialized Groq client with random API key
        """
        selected_key = random.choice(self.api_keys)
        key_index = self.api_keys.index(selected_key) + 1
        
        # Log which key is being used (show last 8 characters for security)
        print(f"🔑 Using Groq API Key #{key_index} (...{selected_key[-8:]})")
        
        return Groq(api_key=selected_key)
    
    def get_all_keys_count(self):
        """
        Return total number of keys available.
        
        Returns:
            int: Number of API keys loaded
        """
        return len(self.api_keys)
    
    def get_client_with_retry(self, max_retries=3):
        """
        Get Groq client with automatic retry on different keys if one fails.
        
        Args:
            max_retries (int): Maximum number of keys to try
            
        Returns:
            Groq: Initialized Groq client
            
        Raises:
            Exception: If all keys fail
        """
        tried_keys = set()
        last_error = None
        
        for attempt in range(min(max_retries, len(self.api_keys))):
            try:
                # Get a key we haven't tried yet
                available_keys = [k for k in self.api_keys if k not in tried_keys]
                if not available_keys:
                    break
                
                selected_key = random.choice(available_keys)
                tried_keys.add(selected_key)
                key_index = self.api_keys.index(selected_key) + 1
                
                print(f"🔑 Attempt {attempt + 1}: Using Groq API Key #{key_index}")
                
                client = Groq(api_key=selected_key)
                # Test the client with a simple call
                return client
                
            except Exception as e:
                last_error = e
                print(f"⚠️ Key #{key_index} failed: {str(e)}")
                continue
        
        raise Exception(f"❌ All {len(tried_keys)} Groq API keys failed. Last error: {last_error}")

# Global instance - will be initialized on first use
_groq_key_manager_instance = None

def _get_groq_key_manager():
    """Get or create the global GroqKeyManager instance (lazy initialization)"""
    global _groq_key_manager_instance
    if _groq_key_manager_instance is None:
        _groq_key_manager_instance = GroqKeyManager()
    return _groq_key_manager_instance

# Create a proxy object that initializes on first access
class GroqKeyManagerProxy:
    """Proxy that delays initialization until first use"""
    
    def __getattr__(self, name):
        # Get the real manager and delegate the call
        manager = _get_groq_key_manager()
        return getattr(manager, name)

# Export the proxy instead of direct instance
groq_key_manager = GroqKeyManagerProxy()
