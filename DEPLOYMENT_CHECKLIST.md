# Deployment Checklist

## ✅ Pre-Deployment Checklist

- [ ] Supabase project created: `https://bxnezhlypsnyxyfxdpjn.supabase.co`
- [ ] Supabase database password obtained
- [ ] Railway account created
- [ ] Vercel account created
- [ ] GitHub repo created (optional but recommended)

---

## 🚀 Deployment Commands

### 1️⃣ Deploy Backend to Railway

```bash
# Install Railway CLI (if not installed)
npm install -g @railway/cli

# Navigate to backend
cd backend

# Login to Railway
railway login

# Create new project
railway init

# Deploy
railway up

# Open dashboard to add environment variables
railway open
```

**Add these environment variables in Railway dashboard:**
```
PORT=3001
DB_NAME=postgres
DB_USER=postgres.bxnezhlypsnyxyfxdpjn
DB_PASSWORD=YOUR_ACTUAL_SUPABASE_PASSWORD
DB_HOST=aws-0-us-west-1.pooler.supabase.com
DB_PORT=6543
JWT_SECRET=your_strong_secret_key_change_this
NODE_ENV=production
SUPABASE_URL=https://bxnezhlypsnyxyfxdpjn.supabase.co
SUPABASE_ANON_KEY=sb_publishable_zdlACSKsZX-_1VNAIYQxyg_FniVnFDH
```

**Copy your backend URL:** `https://gamification-backend-production.up.railway.app`

---

### 2️⃣ Deploy AI Service to Railway

```bash
# Navigate to AI service
cd ../ai-service

# Create new Railway project
railway init

# Deploy
railway up
```

**Copy your AI service URL:** `https://gamification-ai-production.up.railway.app`

---

### 3️⃣ Deploy Frontend to Vercel

```bash
# Install Vercel CLI (if not installed)
npm install -g vercel

# Navigate to frontend
cd ../frontend

# Login to Vercel
vercel login

# Deploy (first time)
vercel

# Answer prompts:
# - Set up and deploy: Y
# - Which scope: [your account]
# - Link to existing project: N
# - Project name: gamification-frontend
# - Directory: ./
# - Override settings: N
```

**Add environment variables in Vercel:**

Go to: https://vercel.com/dashboard > Your Project > Settings > Environment Variables

Add:
```
REACT_APP_SUPABASE_URL=https://bxnezhlypsnyxyfxdpjn.supabase.co
REACT_APP_ANON_KEY=sb_publishable_zdlACSKsZX-_1VNAIYQxyg_FniVnFDH
REACT_APP_API_URL=https://your-backend.railway.app/api
REACT_APP_AI_SERVICE_URL=https://your-ai-service.railway.app
```

**Deploy to production:**
```bash
vercel --prod
```

**Copy your frontend URL:** `https://gamification-frontend.vercel.app`

---

### 4️⃣ Update Backend CORS

Edit `backend/src/utils/app.js` and update CORS:

```javascript
const cors = require('cors');

app.use(cors({
  origin: [
    'https://your-app.vercel.app',  // Replace with your Vercel URL
    'http://localhost:3000'
  ],
  credentials: true
}));
```

Redeploy backend:
```bash
cd backend
railway up
```

---

### 5️⃣ Seed Database

```bash
# Option A: Via Railway CLI
cd backend
railway run npm run seed

# Option B: Via Supabase SQL Editor
# Go to Supabase Dashboard > SQL Editor
# Run the seed SQL manually
```

---

## 🧪 Testing Deployment

1. Open your Vercel URL: `https://your-app.vercel.app`
2. Try logging in:
   - Email: `student@demo.com`
   - Password: `password`
3. Check browser console (F12) for errors
4. Test navigation and features

---

## 📝 Post-Deployment Updates

### Update Frontend Environment Variables

If you need to update API URLs after deployment:

1. Go to Vercel Dashboard
2. Settings > Environment Variables
3. Update values
4. Redeploy: `vercel --prod`

### Update Backend Environment Variables

1. Go to Railway Dashboard
2. Select your backend service
3. Variables tab
4. Update values
5. Service will auto-redeploy

---

## 🔧 Troubleshooting

### CORS Errors
- Verify Vercel URL is in backend CORS whitelist
- Check browser console for exact error
- Ensure credentials: true in CORS config

### Database Connection Failed
- Verify Supabase password is correct
- Check DB_HOST and DB_PORT values
- Ensure Supabase project is active

### Build Failed on Vercel
- Check build logs in Vercel dashboard
- Verify all dependencies in package.json
- Ensure environment variables are set

### API Not Responding
- Check Railway logs for errors
- Verify environment variables are set
- Test API endpoint directly: `https://your-backend.railway.app/api/health`

---

## 💰 Cost Summary

- **Supabase**: Free tier (500MB DB, 2GB bandwidth)
- **Railway**: $5/month credit (covers 2 small services)
- **Vercel**: Free tier (100GB bandwidth)

**Total: $0-5/month**

---

## 🔗 Important URLs

After deployment, save these URLs:

- Frontend: `https://_____.vercel.app`
- Backend: `https://_____.railway.app`
- AI Service: `https://_____.railway.app`
- Supabase Dashboard: `https://supabase.com/dashboard/project/bxnezhlypsnyxyfxdpjn`
- Railway Dashboard: `https://railway.app/dashboard`
- Vercel Dashboard: `https://vercel.com/dashboard`

---

## 📚 Next Steps

1. Set up custom domain (optional)
2. Configure SSL certificates (automatic on Vercel/Railway)
3. Set up monitoring and alerts
4. Configure backup strategy for database
5. Set up CI/CD pipeline with GitHub Actions
