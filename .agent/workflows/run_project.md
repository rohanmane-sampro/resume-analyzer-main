---
description: How to run the restructured project (Unified Backend + Frontend)
---

# Project Structure Update

The project has been reorganized into a professional structure:

- **`frontend/`**: Contains the React + Vite application.
- **`backend/`**: Contains the unified Flask application (AI Service + PDF Generation).

## Prerequisites

Ensure you have the following installed:
- Python 3.8+
- Node.js 16+

## Step 1: Backend Setup

The backend now runs on port **5000**.

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Configure Environment:
   - Ensure your `.env` file (if you have one) is properly set up with `GROQ_API_KEY`.
   - The backend checks for `.env` in the project root or backend directory.

4. Run the backend:
   ```bash
   python app.py
   ```
   You should see: `Starting Unified Backend (AI + PDF)...` on port 5000.

## Step 2: Frontend Setup

The frontend connects to the backend on `http://localhost:5000`.

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies (if not already done):
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

## Step 3: Access the Application

Open your browser and navigate to the URL shown in the frontend terminal (usually `http://localhost:5173`).

All features (Chatbot, Resume Enhancement, PDF Generation) will now communicate with the unified backend on port 5000.
