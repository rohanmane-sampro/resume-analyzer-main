# 🔑 Multiple Groq API Keys Setup Guide

## Overview
This system allows you to use **multiple Groq API keys** simultaneously to:
- ✅ **Avoid rate limits** by distributing requests across multiple free-tier accounts
- ✅ **Reduce costs** by maximizing free tier usage (10 keys = 10× free requests)
- ✅ **Increase reliability** with automatic failover if one key fails
- ✅ **Improve performance** by load balancing across keys

---

## 📋 How It Works

1. **Random Selection**: Each AI request randomly selects one of your configured API keys
2. **Load Distribution**: Requests are evenly distributed across all available keys
3. **Automatic Failover**: If one key fails, the system automatically tries another
4. **Logging**: Console shows which key is being used for debugging

---

## 🚀 Setup Instructions

### Step 1: Get Your Groq API Keys

1. Go to [Groq Console](https://console.groq.com/keys)
2. Create **10 different accounts** (use different emails)
3. Generate an API key for each account
4. Copy all 10 keys

### Step 2: Add Keys to `.env` File

Open `backend/.env` and add your keys:

```env
# Groq API Keys (Add as many as you want)
GROQ_API_KEY_1=gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx1
GROQ_API_KEY_2=gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx2
GROQ_API_KEY_3=gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx3
GROQ_API_KEY_4=gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx4
GROQ_API_KEY_5=gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx5
GROQ_API_KEY_6=gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx6
GROQ_API_KEY_7=gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx7
GROQ_API_KEY_8=gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx8
GROQ_API_KEY_9=gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx9
GROQ_API_KEY_10=gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx10
```

### Step 3: Restart Your Backend

```bash
cd backend
python app.py
```

You should see:
```
✅ Groq Key Manager initialized with 10 API key(s)
✅ AI Service initialized with Groq Key Manager
```

---

## 📊 Usage Example

When you make an AI request, you'll see logs like:

```
🔑 Using Groq API Key #3 (...xxxxx123)
Attempt 1: Making Groq AI call (max_tokens=4096)...
SUCCESS: Groq response received (length: 2543)
```

Each request will randomly select a different key!

---

## 🔧 Advanced Configuration

### Minimum Setup (1 Key)
```env
GROQ_API_KEY_1=your_single_key
```
Works with just 1 key for backward compatibility.

### Recommended Setup (5-10 Keys)
```env
GROQ_API_KEY_1=key1
GROQ_API_KEY_2=key2
GROQ_API_KEY_3=key3
GROQ_API_KEY_4=key4
GROQ_API_KEY_5=key5
```
5-10 keys provide good load distribution.

### Maximum Setup (Unlimited)
You can add as many keys as you want:
```env
GROQ_API_KEY_1=key1
GROQ_API_KEY_2=key2
...
GROQ_API_KEY_50=key50
```

---

## 🌐 Deployment (Azure/Heroku/AWS)

### Azure App Service
```bash
az webapp config appsettings set \
  --name your-app-name \
  --resource-group your-rg \
  --settings \
  GROQ_API_KEY_1="gsk_xxx1" \
  GROQ_API_KEY_2="gsk_xxx2" \
  GROQ_API_KEY_3="gsk_xxx3"
```

### Heroku
```bash
heroku config:set GROQ_API_KEY_1="gsk_xxx1"
heroku config:set GROQ_API_KEY_2="gsk_xxx2"
heroku config:set GROQ_API_KEY_3="gsk_xxx3"
```

### Docker/Docker Compose
```yaml
environment:
  - GROQ_API_KEY_1=gsk_xxx1
  - GROQ_API_KEY_2=gsk_xxx2
  - GROQ_API_KEY_3=gsk_xxx3
```

---

## 🐛 Troubleshooting

### Error: "No Groq API keys found"
**Solution**: Make sure you have at least `GROQ_API_KEY_1` in your `.env` file

### Error: "All X Groq API keys failed"
**Solution**: Check that all your keys are valid and not expired

### Keys not loading
**Solution**: 
1. Restart your backend server
2. Check `.env` file format (no spaces around `=`)
3. Make sure keys start with `gsk_`

---

## 📈 Benefits by Number of Keys

| Keys | Free Requests/Month | Rate Limit Protection | Cost Savings |
|------|---------------------|----------------------|--------------|
| 1    | ~14,400            | Low                  | $0           |
| 5    | ~72,000            | Medium               | ~$50/month   |
| 10   | ~144,000           | High                 | ~$100/month  |

---

## 🔒 Security Notes

- ✅ Never commit `.env` file to git (already in `.gitignore`)
- ✅ Use different email accounts for each Groq key
- ✅ Rotate keys periodically for security
- ✅ Monitor usage in Groq console

---

## 💡 Tips

1. **Start with 3-5 keys** and add more if needed
2. **Monitor logs** to see which keys are being used
3. **Test each key** individually before adding to production
4. **Keep backup keys** in case some expire

---

## 📞 Support

If you encounter any issues:
1. Check the console logs for error messages
2. Verify all keys are valid in Groq console
3. Ensure `.env` file is properly formatted
4. Restart the backend server

---

**Created**: 2025-12-30
**Version**: 1.0.0
**Status**: ✅ Production Ready
