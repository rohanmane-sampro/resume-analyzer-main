from flask import Blueprint, request, jsonify, send_file
from src.services.pdf_service import PDFService
from src.middleware.auth import token_required
import io

pdf_bp = Blueprint('pdf', __name__)

@pdf_bp.route('/generate-pdf', methods=['POST'])
@token_required
def generate_pdf(current_user):
    data = request.get_json()
    html_content = data.get('html')
    
    try:
        # Check if service is available
        if not PDFService.is_available():
            return jsonify({
                'error': 'Server-side PDF generation not available. Please use browser Print-to-PDF feature.',
                'suggestion': 'The frontend will automatically use browser printing which preserves all styling perfectly.'
            }), 503
            
        # Generate PDF (returns temp filename)
        tmp_filename = PDFService.generate_pdf(html_content)
        
        try:
            # Read file into memory to ensure we can delete it safely
            with open(tmp_filename, 'rb') as f:
                pdf_data = f.read()
                
            # Create bytes buffer
            pdf_buffer = io.BytesIO(pdf_data)
            
            # Send file
            return send_file(
                pdf_buffer,
                mimetype='application/pdf',
                as_attachment=True,
                download_name='resume.pdf'
            )
            
        finally:
            # Always clean up the temp file
            PDFService.cleanup_file(tmp_filename)
            
    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except RuntimeError as e:
        return jsonify({'error': str(e)}), 503
    except Exception as e:
        print(f"PDF generation error: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': f'PDF generation failed: {str(e)}'}), 500
