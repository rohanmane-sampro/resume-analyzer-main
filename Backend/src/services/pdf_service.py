import os
import tempfile
import time

# Try to import PDF generation libraries in order of preference
PDF_LIBRARY = None

try:
    from weasyprint import HTML
    PDF_LIBRARY = 'weasyprint'
    print("✓ Using WeasyPrint for PDF generation (Best quality)")
except (ImportError, OSError) as e:
    print(f"⚠ WeasyPrint not available: {str(e)[:100]}")
    try:
        from xhtml2pdf import pisa
        PDF_LIBRARY = 'xhtml2pdf'
        print("✓ Using xhtml2pdf for PDF generation")
    except ImportError:
        print("⚠ No server-side PDF library available.")
        print("  Clients will use browser's built-in Print-to-PDF feature.")
        PDF_LIBRARY = None

def html_to_pdf_weasyprint(html_content, output_filename):
    """Convert HTML to PDF using WeasyPrint (best quality, preserves CSS)"""
    from weasyprint import HTML, CSS
    
    # Inject @page CSS to enforce A4 size
    page_css = CSS(string='''
        @page {
            size: A4;
            margin: 0;
        }
    ''')
    
    # WeasyPrint handles CSS beautifully - write directly to file
    HTML(string=html_content, base_url=".").write_pdf(
        output_filename,
        stylesheets=[page_css]
    )

def html_to_pdf_xhtml2pdf(html_content, output_filename):
    """Convert HTML to PDF using xhtml2pdf"""
    from xhtml2pdf import pisa
    
    with open(output_filename, "w+b") as result_file:
        pisa_status = pisa.CreatePDF(
            html_content,
            dest=result_file
        )
    
    if pisa_status.err:
        raise Exception(f"xhtml2pdf conversion failed with error code: {pisa_status.err}")

class PDFService:
    @staticmethod
    def is_available():
        return PDF_LIBRARY is not None

    @staticmethod
    def generate_pdf(html_content):
        if not html_content:
            raise ValueError('No HTML content provided')

        if not PDF_LIBRARY:
            raise RuntimeError('Server-side PDF generation not available')

        tmp_filename = None
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
                raise RuntimeError('No PDF generation library available')
            
            return tmp_filename
            
        except Exception as e:
            # Clean up if something failed
            if tmp_filename and os.path.exists(tmp_filename):
                try:
                    os.unlink(tmp_filename)
                except:
                    pass
            raise e
    
    @staticmethod
    def cleanup_file(filename):
        try:
            if filename and os.path.exists(filename):
                # Small delay to ensure file is sent before deletion
                time.sleep(0.5)
                os.unlink(filename)
        except:
            pass
