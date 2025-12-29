import os
import re

# Path to templates directory
TEMPLATES_DIR = r"d:\RESUME ANALYZER\resume-analyzer-main\frontend\src\components\Templates"

# Template files to update (T1-T26, excluding T8 which was just created)
TEMPLATE_FILES = [f"T{i}.jsx" for i in range(1, 27)]

def fix_print_styles_in_file(filepath):
    """Fix print styles in a template file"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Pattern to find @media print blocks
    # We'll look for @page and .resume-container within @media print
    
    # Fix 1: Change @page margin from any value to 0
    content = re.sub(
        r'(@page\s*{[^}]*margin:\s*)([^;]+)(;)',
        r'\g<1>0\g<3>',
        content,
        flags=re.DOTALL
    )
    
    # Fix 2: Update .resume-container within @media print
    # Find the @media print block and update .resume-container
    def update_resume_container(match):
        media_block = match.group(0)
        
        # Update width to 210mm
        media_block = re.sub(
            r'(\.resume-container\s*{[^}]*width:\s*)([^!]+)(!important)',
            r'\g<1>210mm \g<3>',
            media_block
        )
        
        # Update max-width to 210mm
        media_block = re.sub(
            r'(\.resume-container\s*{[^}]*max-width:\s*)([^!]+)(!important)',
            r'\g<1>210mm \g<3>',
            media_block
        )
        
        # Update min-height to auto
        media_block = re.sub(
            r'(\.resume-container\s*{[^}]*min-height:\s*)([^!]+)(!important)',
            r'\g<1>auto \g<3>',
            media_block
        )
        
        # Update padding to 15mm
        media_block = re.sub(
            r'(\.resume-container\s*{[^}]*padding:\s*)([^!]+)(!important)',
            r'\g<1>15mm \g<3>',
            media_block
        )
        
        # Ensure background is #fff or white
        if 'background:' in media_block and 'transparent' in media_block:
            media_block = re.sub(
                r'(\.resume-container\s*{[^}]*background:\s*)transparent(\s*!important)',
                r'\g<1>#fff\g<2>',
                media_block
            )
        
        return media_block
    
    # Apply updates to @media print blocks
    content = re.sub(
        r'@media\s+print\s*{.*?^\}',
        update_resume_container,
        content,
        flags=re.MULTILINE | re.DOTALL
    )
    
    # Write back
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    return True

def main():
    """Main function to update all templates"""
    updated_count = 0
    failed_files = []
    
    for template_file in TEMPLATE_FILES:
        filepath = os.path.join(TEMPLATES_DIR, template_file)
        
        if not os.path.exists(filepath):
            print(f"⚠️  Skipping {template_file} (file not found)")
            continue
        
        try:
            fix_print_styles_in_file(filepath)
            print(f"✅ Updated {template_file}")
            updated_count += 1
        except Exception as e:
            print(f"❌ Failed to update {template_file}: {str(e)}")
            failed_files.append(template_file)
    
    print(f"\n{'='*50}")
    print(f"✅ Successfully updated {updated_count} templates")
    if failed_files:
        print(f"❌ Failed to update {len(failed_files)} templates: {', '.join(failed_files)}")
    print(f"{'='*50}")

if __name__ == "__main__":
    main()
