
from src.database import settings_collection
import pprint

print("Fetching global_config settings...")
settings = settings_collection.find_one({'type': 'global_config'})

if settings:
    print("Settings found:")
    # Print keys to check structure
    if 'knowledge_hub_limits' in settings:
        print("\nKnowledge Hub Limits:")
        pprint.pprint(settings['knowledge_hub_limits'])
    else:
        print("\n'knowledge_hub_limits' key NOT found.")

    if 'guest_limits' in settings:
        print("\nGuest Limits:")
        pprint.pprint(settings['guest_limits'])
    else:
        print("\n'guest_limits' key NOT found.")
        
    print("\nFull Settings Object:")
    pprint.pprint(settings)
else:
    print("No global_config found in settings collection.")
