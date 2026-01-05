from flask import Flask, jsonify, render_template, send_from_directory, redirect
from flask_cors import CORS
from src.config import Config
from src.routes.ai_routes import ai_bp
from src.routes.pdf_routes import pdf_bp
from src.routes.auth_routes import auth_bp
from src.routes.resume_routes import resume_bp
from src.routes.admin_routes import admin_bp
import os

def create_app():
    # Initialize Flask with explicit static/template folders relative to this file
    app = Flask(__name__, static_folder='static', template_folder='templates')
    
    # Configure CORS
    CORS(app, resources={r"/*": {
        "origins": Config.CORS_ORIGINS,
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }})
    
    # Register Blueprints
    app.register_blueprint(ai_bp)
    app.register_blueprint(pdf_bp)
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(resume_bp, url_prefix='/api/resume')
    app.register_blueprint(admin_bp, url_prefix='/api/admin')
    
    # Redirect root to the specific base path used by Vite
    @app.route('/')
    def root():
        return redirect('/Resume-builder/')

    # Serve React Frontend at the configured base path
    @app.route('/Resume-builder/')
    def index():
        try:
            return render_template('index.html')
        except Exception:
            return jsonify({
                "status": "running",
                "message": "Backend is running. Frontend not found (build React app to serve it).",
                "api_health": "/api/health"
            })

    # Serve static assets and handle client-side routing
    @app.route('/<path:path>')
    def serve_static(path):
        # Check if file exists in static folder
        # This handles /Resume-builder/assets/... calls if folders match
        if os.path.exists(os.path.join(app.static_folder, path)):
            return send_from_directory(app.static_folder, path)
        
        # If not a file and not an API route, serve index.html for React Router
        if not path.startswith('api/'):
            try:
                return render_template('index.html')
            except Exception:
                return "Frontend not found", 404
        
        return "Not Found", 404

    @app.route('/api/health')
    def health_check():
        return jsonify({
            "status": "running",
            "message": "Unified Backend is Active",
            "endpoints": {
                "ai": "/health", # Note: ai_bp might need a health route or just use this
                "pdf": "/generate-pdf",
                "auth": "/api/auth",
                "resume": "/api/resume",
                "admin": "/api/admin"
            }
        })
    
    return app

app = create_app()

if __name__ == '__main__':
    print("Starting Unified Backend (AI + PDF + Auth) on 0.0.0.0:5000...")
    # Host 0.0.0.0 makes it accessible from any local address and avoids resolution issues
    app.run(debug=True, port=5000, host='0.0.0.0')
