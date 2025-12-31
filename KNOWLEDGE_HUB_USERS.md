# 🎓 Knowledge Hub Test Users - Quick Reference

## Database Information

**Database Name:** `knowledge_hub`
**Collection:** `users`
**MongoDB URI:** `mongodb://localhost:27017/`

---

## 🔑 Test User Credentials

### USER 1: BASIC PLAN 🟢
```
Email:    basic@knowledgehub.com
Password: Basic@123

Plan Details:
- Subscription: Basic
- Template Limit: 3 templates
- Downloads per Template: 5 downloads
- Total Possible Downloads: 15 (3 templates × 5 downloads)
```

### USER 2: STANDARD PLAN 🔵
```
Email:    standard@knowledgehub.com
Password: Standard@123

Plan Details:
- Subscription: Standard
- Template Limit: 10 templates
- Downloads per Template: 15 downloads
- Total Possible Downloads: 150 (10 templates × 15 downloads)
```

### USER 3: ENTERPRISE PLAN 🟣
```
Email:    enterprise@knowledgehub.com
Password: Enterprise@123

Plan Details:
- Subscription: Enterprise
- Template Limit: 20 templates
- Downloads per Template: 50 downloads
- Total Possible Downloads: 1,000 (20 templates × 50 downloads)
```

### USER 4: PREMIUM PLAN 👑
```
Email:    premium@knowledgehub.com
Password: Premium@123

Plan Details:
- Subscription: Premium
- Template Limit: 999 (Unlimited)
- Downloads per Template: 999 (Unlimited)
- Total Possible Downloads: Unlimited
```

---

## 📊 Plan Comparison

| Plan       | Templates | Downloads/Template | Total Downloads |
|------------|-----------|-------------------|-----------------|
| Basic      | 3         | 5                 | 15              |
| Standard   | 10        | 15                | 150             |
| Enterprise | 20        | 50                | 1,000           |
| Premium    | 999       | 999               | Unlimited       |

---

## 🧪 Testing Scenarios

### Test Basic Plan Limits
1. Login: `basic@knowledgehub.com` / `Basic@123`
2. Try to access 4th template → Should be blocked
3. Download same template 6 times → 6th should be blocked
4. Should see upgrade modal

### Test Standard Plan
1. Login: `standard@knowledgehub.com` / `Standard@123`
2. Can access 10 different templates
3. Each template can be downloaded 15 times
4. More flexibility than Basic

### Test Enterprise Plan
1. Login: `enterprise@knowledgehub.com` / `Enterprise@123`
2. Can access 20 different templates
3. Each template can be downloaded 50 times
4. High limits for business use

### Test Premium Plan (Unlimited)
1. Login: `premium@knowledgehub.com` / `Premium@123`
2. Can access all templates (999 = unlimited)
3. No download restrictions
4. Should never see upgrade modal

---

## 🔄 Re-running Setup

If you need to recreate the users:

```bash
cd backend
python setup_knowledge_hub_users.py
```

This will:
- Clear existing test users
- Create fresh users with default limits
- Generate new credentials file

---

## 📝 User Document Structure

Each user in the database has:

```json
{
  "_id": "ObjectId",
  "name": "Basic Plan User",
  "email": "basic@knowledgehub.com",
  "password": "hashed_password",
  "role": "user",
  "type": "knowledge_hub",
  "subscription_plan": "basic",
  "template_limit": 3,
  "downloads_per_template": 5,
  "template_usage": {},
  "status": "active",
  "created_at": "2025-12-31T...",
  "last_login": null
}
```

---

## 🎯 Quick Login Test

1. **Open your app**: `http://localhost:5174` (or your frontend URL)
2. **Click Login**
3. **Use any test user credentials above**
4. **Test the limits**:
   - Basic: Try 4th template (blocked)
   - Standard: Access 10 templates
   - Enterprise: Access 20 templates
   - Premium: Unlimited access

---

## 📂 Files Created

1. ✅ `setup_knowledge_hub_users.py` - Setup script
2. ✅ `KNOWLEDGE_HUB_CREDENTIALS.txt` - Login credentials
3. ✅ `KNOWLEDGE_HUB_USERS.md` - This documentation

---

## 🗄️ Database Access

To view users in MongoDB:

```javascript
// MongoDB Shell
use knowledge_hub
db.users.find().pretty()

// Count users
db.users.count()

// Find specific user
db.users.findOne({email: "basic@knowledgehub.com"})
```

---

## ✅ Verification

All 4 users have been created successfully in the `knowledge_hub` database!

You can now login and test different subscription plans.

---

**Created:** 2025-12-31
**Status:** ✅ Ready to Use
**Database:** knowledge_hub
**Users:** 4 test users with different plans
