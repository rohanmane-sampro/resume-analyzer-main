from flask import Flask
from flask_cors import CORS
from .config import Config

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Allow CORS for frontend
    CORS(app, resources={r"/*": {"origins": app.config['CORS_ORIGINS']}})

    # Register Blueprints
    from .routes.ai_routes import ai_bp
    from .routes.pdf_routes import pdf_bp
    from .routes.main_routes import main_bp

    app.register_blueprint(ai_bp)
    app.register_blueprint(pdf_bp)  # Note: Mount at root to match '/generate-pdf' structure or use url_prefix
    app.register_blueprint(main_bp)

    return app
