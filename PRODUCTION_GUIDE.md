# Production Deployment Guide

This project is structured to be production-ready. Here is the overview of the architecture and deployment steps.

## Architecture

- **Frontend**: React + Vite (Single Page Application)
- **Backend**: Flask (Unified API for AI, PDF, Auth, Database)
- **Database**: MongoDB Atlas (Cloud)

## Directory Structure

```
/
├── frontend/           # React Application
│   ├── src/           # Source code
│   ├── dist/          # Production build (after npm run build)
│   └── ...
├── Backend/            # Flask Application
│   ├── src/           # Application logic (Routes, Models, Config)
│   ├── app.py         # Development entry point
│   ├── wsgi.py        # Production entry point (Gunicorn/Waitress)
│   └── ...
└── ...
```

## Deployment Steps

### 1. Backend Deployment (e.g., Render, Railway, Heroku)

1.  **Build Command**: `pip install -r requirements.txt`
2.  **Start Command**: `gunicorn wsgi:application` (for Linux) or use `waitress` for Windows.
3.  **Environment Variables**:
    - `MONGODB_URI`: Your MongoDB connection string
    - `GROQ_API_KEY`: API Key for AI features
    - `JWT_SECRET`: Random secret string
    - `ADMIN_EMAIL`: Admin email address
    - `ADMIN_PASSWORD`: Admin password

### 2. Frontend Deployment (e.g., Vercel, Netlify)

1.  **Build Command**: `npm run build`
2.  **Output Directory**: `dist`
3.  **Environment Variables**:
    - `VITE_API_URL`: The URL of your deployed backend (e.g., `https://your-backend.onrender.com`)

## Production Optimization Checklist

- [x] **Unified Backend**: All services run on a single port (5000)
- [x] **Centralized Config**: Frontend uses `apiConfig.js` to automatically detect backend URL.
- [x] **WSGI Entry Point**: `wsgi.py` created for production servers.
- [x] **Clean Structure**: Unused `AIBackend` and legacy code removed.
- [x] **Database**: MongoDB Cloud configured for scalability.

## Running Locally (Production Simulation)

1.  **Backend**:
    ```bash
    cd Backend
    waitress-serve --port=5000 wsgi:application
    ```

2.  **Frontend**:
    ```bash
    cd frontend
    npm run build
    npm run preview
    ```
