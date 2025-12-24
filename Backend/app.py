from src import create_app

app = create_app()

if __name__ == "__main__":
    print("\n" + "="*60)
    print("Resume Analyzer - Unified Backend Service")
    print("="*60)
    print("✓ Service running on http://localhost:5000")
    print("="*60 + "\n")
    app.run(debug=True, port=5000)
