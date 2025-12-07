from flask import Flask, jsonify
from flask_cors import CORS
from app.routes import registration
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def create_app():
    app = Flask(__name__)
    
    # Print startup message
    print("=== College Registration Backend Starting ===")
    print(f"Current working directory: {os.getcwd()}")
    
    # Configure CORS to allow multiple frontend ports
    CORS(app, origins=[
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:3002",
        "http://localhost:3003",
        "http://localhost:3004",
        "http://localhost:3005",
        "http://localhost:3006",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3006"
    ])
    
    # Register blueprints
    app.register_blueprint(registration.bp, url_prefix='/api')
    
    @app.route("/")
    def root():
        return jsonify({"message": "College Registration API"})
    
    # Initialize startup message flag
    app._startup_message_shown = False
    
    @app.before_request
    def startup_message_once():
        if not app._startup_message_shown:
            print("✅ Backend started successfully!")
            print("Available routes:")
            # Note: Flask doesn't have a direct way to list all routes like FastAPI
            app._startup_message_shown = True
    
    return app

app = create_app()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)