"""
Fix .env file by removing BOM (Byte Order Mark)
"""

# Read the file with BOM
with open('.env', 'r', encoding='utf-8-sig') as f:
    content = f.read()

# Write back without BOM
with open('.env', 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ .env file fixed! BOM removed.")
print("🔄 Please run your tests again.")
