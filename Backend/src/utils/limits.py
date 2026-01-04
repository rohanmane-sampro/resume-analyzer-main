
from src.database import settings_collection
import sys

def get_effective_limits(user, global_settings=None):
    """
    Determines the effective template and download limits for a user
    based on the hierarchy:
    1. Individual Override (has_custom_limits=True)
    2. Knowledge Hub Group Policy (if type='knowledge_hub')
    3. Guest/Standard Group Policy (default)
    
    Returns a dict: {'template_limit': int}
    """
    
    # Optional: Debug logging
    # print(f"Calculating limits for: {user.get('email')} ({user.get('type')})", file=sys.stderr)

    # 1. Individual Override
    if user.get('has_custom_limits') is True:
        return {
            'template_limit': int(user.get('template_limit', 0))
        }

    # Fetch Global Settings if not provided
    if global_settings is None:
        global_settings = settings_collection.find_one({'type': 'global_config'}) or {}
    
    # 2. Knowledge Hub Logic
    # Case-insensitive check to be robust
    user_type = str(user.get('type', '')).strip().lower()
    
    if user_type == 'knowledge_hub':
        # Retrieve KH limits safely. Handle case where key exists but is None.
        kh_limits = global_settings.get('knowledge_hub_limits') or {}
        
        plan = str(user.get('subscription_plan', 'basic')).strip().lower()
        
        # Try to find specific plan limits
        plan_data = kh_limits.get(plan)
        
        if plan_data:
             return {
                'template_limit': int(plan_data.get('templates', 0))
            }
        
        # STRICT: If plan is not found in Admin Settings, return 0.
        return {
            'template_limit': 0
        }

    # 3. Guest/Standard Logic
    # -------------------------------------------------------------------------
    # Default Guest Limits (Fetch from global settings or default strict)
    guest_limits = global_settings.get('guest_limits', {})
    return {
        'template_limit': int(guest_limits.get('templates', 0))
    }
