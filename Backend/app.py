from flask import Flask, jsonify
from flask_cors import CORS
from src.config import Config
from src.routes.ai_routes import ai_bp
from src.routes.pdf_routes import pdf_bp
from src.routes.auth_routes import auth_bp
from src.routes.resume_routes import resume_bp
from src.routes.admin_routes import admin_bp

def create_app():
    app = Flask(__name__)
    
    # Configure CORS - Use dynamic origins from config for better flexibility
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
    
    @app.route('/')
    def index():
        return jsonify({
            "status": "running",
            "message": "Unified Backend is Active",
            "endpoints": {
                "ai": "/health",
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
