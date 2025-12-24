import os
import tempfile
from flask import send_file, current_app

# Try to import PDF generation libraries in order of preference
PDF_LIBRARY = None

try:
    from weasyprint import HTML, CSS
    PDF_LIBRARY = 'weasyprint'
except (ImportError, OSError):
    try:
        from xhtml2pdf import pisa
        PDF_LIBRARY = 'xhtml2pdf'
    except ImportError:
        PDF_LIBRARY = None

def get_pdf_status():
    return PDF_LIBRARY

def html_to_pdf_weasyprint(html_content, output_filename):
    """Convert HTML to PDF using WeasyPrint (best quality, preserves CSS)"""
    from weasyprint import HTML
    # WeasyPrint handles CSS beautifully - write directly to file
    HTML(string=html_content, base_url=".").write_pdf(output_filename)

def html_to_pdf_xhtml2pdf(html_content, output_filename):
    """Convert HTML to PDF using xhtml2pdf"""
    from xhtml2pdf import pisa
    with open(output_filename, "w+b") as result_file:
        pisa_status = pisa.CreatePDF(html_content, dest=result_file)
    if pisa_status.err:
        raise Exception(f"xhtml2pdf conversion failed with error code: {pisa_status.err}")

def generate_pdf_from_html(html_content):
    if not PDF_LIBRARY:
        return None, "Server-side PDF generation not available. Please use browser Print-to-PDF feature."
    
    try:
        # Create a temporary file for the PDF
        with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as tmp_file:
            tmp_filename = tmp_file.name
        
        # Generate PDF based on available library
        if PDF_LIBRARY == 'weasyprint':
            html_to_pdf_weasyprint(html_content, tmp_filename)
        elif PDF_LIBRARY == 'xhtml2pdf':
            html_to_pdf_xhtml2pdf(html_content, tmp_filename)
        else:
            return None, "No PDF generation library available"
        
        return tmp_filename, None
        
    except Exception as e:
        import traceback
        traceback.print_exc()
        return None, str(e)
