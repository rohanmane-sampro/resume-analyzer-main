# MongoDB Setup Guide - Resume Analyzer

## ✅ Setup Status: COMPLETE

Your MongoDB Cloud connection has been successfully configured and tested!

## 📋 Configuration Summary

### Environment Variables
Your `.env` file in the `Backend` directory contains:
- `MONGODB_URI` - Your MongoDB Atlas connection string
- `GROQ_API_KEY` - Your Groq API key for AI features
- `JWT_SECRET` - Secret key for JWT authentication
- `ADMIN_EMAIL` - Admin account email
- `ADMIN_PASSWORD` - Admin account password

### Database Structure
The application uses the following MongoDB collections:

1. **users** - Stores user accounts and authentication data
   - Fields: name, email, password (hashed), role, created_at, download_limit, template_limit, status

2. **resumes** - Tracks resume creation and downloads
   - Fields: user_id, template_id, metadata, created_at, download_count

3. **templates** - Stores resume templates (if used)
   - Custom template data

4. **settings** - Global system configuration
   - Fields: default_download_limit, default_template_limit, downloads_enabled, maintenance_mode

## 🚀 Current Status

### Backend Server
- **Status**: ✅ Running
- **Port**: 5000
- **Host**: 0.0.0.0 (accessible from all network interfaces)
- **MongoDB**: ✅ Connected successfully

### Frontend Server
- **Status**: ✅ Running
- **Port**: 5173 (typically)
- **Framework**: React + Vite

## 🔧 Database Features

### User Management
- User registration and authentication
- Role-based access control (admin/user)
- Download and template limits per user
- User status management (active/disabled)

### Admin Features
- View all users and their statistics
- Update user limits and status
- Bulk update users by type or subscription plan
- View analytics (resume trends, template usage)
- Manage global system settings

### Resume Tracking
- Track resume creation
- Monitor download counts
- Enforce download limits per user
- Admin bypass for unlimited downloads

## 📊 API Endpoints

### Authentication (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - User login
- `GET /me` - Get current user info

### Resume Management (`/api/resume`)
- `POST /track/create` - Track resume creation
- `POST /track/download/<resume_id>` - Track resume download
- `GET /stats` - Get user statistics

### Admin Panel (`/api/admin`)
- `GET /stats` - Get system statistics
- `GET /users` - Get all users
- `POST /users/<user_id>` - Update user settings
- `POST /users/bulk-update` - Bulk update users
- `GET /analytics/resume-trends` - Resume creation trends
- `GET /analytics/templates` - Template usage analytics
- `GET /settings` - Get system settings
- `POST /settings` - Update system settings

## 🔐 Security Features

1. **Password Hashing**: Uses bcrypt for secure password storage
2. **JWT Authentication**: Token-based authentication with 24-hour expiry
3. **Role-Based Access**: Admin and user roles with different permissions
4. **CORS Protection**: Configured for local development and production
5. **Environment Variables**: Sensitive data stored in `.env` file (gitignored)

## 🎯 Default Configuration

- **Default Download Limit**: 5 per user
- **Default Template Limit**: 10 per user
- **JWT Expiry**: 24 hours
- **Admin Account**: Configured via environment variables

## 📝 Testing the Connection

The connection has been verified with:
```python
# MongoDB ping command successful
✅ MongoDB Connected successfully to database: [your_database_name]
```

## 🛠️ Troubleshooting

### If MongoDB connection fails:

1. **Check MongoDB Atlas Network Access**
   - Go to MongoDB Atlas Dashboard
   - Navigate to Network Access
   - Ensure your IP address is whitelisted (or use 0.0.0.0/0 for development)

2. **Verify Connection String**
   - Ensure `MONGODB_URI` in `.env` is correct
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority`

3. **Check Database User Permissions**
   - Ensure the database user has read/write permissions
   - Verify username and password are correct

4. **Firewall Settings**
   - Check if your firewall is blocking MongoDB connections
   - Default MongoDB port: 27017

### Common Issues:

- **"ServerSelectionTimeoutError"**: Network access not configured or wrong IP
- **"Authentication failed"**: Wrong username/password in connection string
- **"Database not found"**: Database name in URI might be incorrect

## 📚 Next Steps

1. **Create Admin Account**: Register with the admin email from `.env`
2. **Test User Registration**: Create a test user account
3. **Upload Resume**: Test the resume analysis feature
4. **Check Analytics**: View admin dashboard for statistics

## 🔄 Restarting the Application

To restart both servers:

```bash
# Backend (from Backend directory)
python app.py

# Frontend (from frontend directory)
npm run dev
```

Or use the workflow command:
```
/run_project
```

## 📞 Support

If you encounter any issues:
1. Check the terminal output for error messages
2. Verify all environment variables are set correctly
3. Ensure MongoDB Atlas is accessible from your network
4. Check the application logs for detailed error information

---

**Last Updated**: 2025-12-30
**Status**: ✅ Fully Operational
