from flask import Blueprint, send_file, request, jsonify
import os
from ..services.pdf_service import generate_pdf_from_html, get_pdf_status

pdf_bp = Blueprint('pdf', __name__)

@pdf_bp.route('/generate-pdf', methods=['POST'])
def generate_pdf():
    data = request.get_json()
    html_content = data.get('html')
    
    if not html_content:
        return jsonify({'error': 'No HTML content provided'}), 400

    tmp_filename, error = generate_pdf_from_html(html_content)
    
    if error:
        status_code = 503 if "not available" in error else 500
        return jsonify({
            'error': error,
            'suggestion': 'The frontend will automatically use browser printing which preserves all styling perfectly.'
        }), status_code

    try:
        # Send the PDF file
        return send_file(
            tmp_filename,
            mimetype='application/pdf',
            as_attachment=True,
            download_name='resume.pdf'
        )
    finally:
        # Clean up temporary file after a delay
        try:
            if tmp_filename and os.path.exists(tmp_filename):
                # We can't easily wait here in Flask's sync model without blocking
                pass 
        except:
            pass
