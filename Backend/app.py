from flask import Flask, jsonify
from flask_cors import CORS
from src.config import Config
from src.routes.ai_routes import ai_bp
from src.routes.pdf_routes import pdf_bp

def create_app():
    app = Flask(__name__)
    
    # Configure CORS - Use dynamic origins from config for better flexibility
    CORS(app, resources={r"/*": {
        "origins": Config.CORS_ORIGINS,
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }})
    
    # Register Blueprints
    # Register Blueprints
    from src.routes.auth_routes import auth_bp
    app.register_blueprint(ai_bp)
    app.register_blueprint(pdf_bp)
    app.register_blueprint(auth_bp, url_prefix='/api/auth')

    # Initialize Database
    from src.database import Database
    Database.initialize()
    
    @app.route('/')
    def index():
        return jsonify({
            "status": "running",
            "message": "Unified Backend is Active",
            "endpoints": {
                "ai": "/health",
                "pdf": "/generate-pdf"
            }
        })
    
    return app

app = create_app()

if __name__ == '__main__':
    print("Starting Unified Backend (AI + PDF) on 0.0.0.0:5000...")
    # Host 0.0.0.0 makes it accessible from any local address and avoids resolution issues
    app.run(debug=True, port=5000, host='0.0.0.0')
