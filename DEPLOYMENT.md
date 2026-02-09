# Deployment Guide

## Overview
- **Frontend**: Vercel
- **Backend API**: Supabase Edge Functions
- **AI Service**: Supabase Edge Functions
- **Database**: Supabase PostgreSQL

## Prerequisites
- Supabase account (https://supabase.com)
- Vercel account (https://vercel.com)
- Supabase CLI installed: `npm install -g supabase`
- Vercel CLI installed: `npm install -g vercel`

---

## Part 1: Supabase Setup (Backend + Database + AI Service)

### Step 1: Create Supabase Project
1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Note your project details:
   - Project URL: `https://bxnezhlypsnyxyfxdpjn.supabase.co`
   - Anon Key: `sb_publishable_zdlACSKsZX-_1VNAIYQxyg_FniVnFDH`
   - Service Role Key: (from Settings > API)

### Step 2: Configure Database
1. Go to Database > Settings
2. Note your connection details:
   - Host: `aws-0-us-west-1.pooler.supabase.com`
   - Port: `6543`
   - Database: `postgres`
   - User: `postgres.bxnezhlypsnyxyfxdpjn`

### Step 3: Run Database Migrations
```bash
# Connect to your Supabase database using SQL Editor in dashboard
# Or use the connection string from Settings > Database
```

Run this SQL in Supabase SQL Editor to create tables:
```sql
-- Users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'student',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add other tables as needed from your models
```

### Step 4: Deploy Backend as Edge Function

**Option A: Using Supabase CLI (Recommended)**
```bash
# Login to Supabase
supabase login

# Link your project
supabase link --project-ref bxnezhlypsnyxyfxdpjn

# Deploy functions
supabase functions deploy backend
supabase functions deploy ai-service
```

**Option B: Deploy Backend to External Service (Railway/Render)**

Since Supabase Edge Functions use Deno (not Node.js), you can deploy your Node.js backend to:

**Railway.app:**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize
railway init

# Deploy
railway up
```

**Render.com:**
1. Go to https://render.com
2. Click "New +" > "Web Service"
3. Connect your GitHub repo
4. Configure:
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`
   - Add environment variables from backend/.env

### Step 5: Deploy AI Service

**Option A: Deploy to Railway/Render**

**Railway:**
```bash
railway init
# Select ai-service directory
railway up
```

**Render:**
1. New Web Service
2. Build Command: `cd ai-service && pip install -r requirements.txt`
3. Start Command: `cd ai-service && uvicorn app.main:app --host 0.0.0.0 --port $PORT`

**Option B: Use Supabase Edge Functions with Python**
Note: Supabase Edge Functions primarily support Deno/TypeScript. For Python, use external hosting.

---

## Part 2: Vercel Deployment (Frontend)

### Step 1: Prepare Frontend
```bash
cd frontend

# Install dependencies
npm install

# Test build locally
npm run build
```

### Step 2: Deploy to Vercel

**Option A: Using Vercel CLI**
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

**Option B: Using Vercel Dashboard**
1. Go to https://vercel.com/dashboard
2. Click "Add New" > "Project"
3. Import your GitHub repository
4. Configure:
   - Framework Preset: Create React App
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `build`

### Step 3: Configure Environment Variables in Vercel
Add these in Vercel Dashboard > Settings > Environment Variables:

```
REACT_APP_SUPABASE_URL=https://bxnezhlypsnyxyfxdpjn.supabase.co
REACT_APP_ANON_KEY=sb_publishable_zdlACSKsZX-_1VNAIYQxyg_FniVnFDH
REACT_APP_API_URL=https://your-backend-url.railway.app/api
REACT_APP_AI_SERVICE_URL=https://your-ai-service-url.railway.app
```

---

## Part 3: Recommended Architecture

Since Supabase Edge Functions are Deno-based and your backend is Node.js:

### Recommended Setup:
1. **Database**: Supabase PostgreSQL ✅
2. **Backend API**: Railway or Render (Node.js) ✅
3. **AI Service**: Railway or Render (Python/FastAPI) ✅
4. **Frontend**: Vercel (React) ✅

### Updated Environment Variables

**Backend (.env on Railway/Render):**
```env
PORT=3001
SUPABASE_URL=https://bxnezhlypsnyxyfxdpjn.supabase.co
SUPABASE_ANON_KEY=sb_publishable_zdlACSKsZX-_1VNAIYQxyg_FniVnFDH
DB_NAME=postgres
DB_USER=postgres.bxnezhlypsnyxyfxdpjn
DB_PASSWORD=your_actual_supabase_password
DB_HOST=aws-0-us-west-1.pooler.supabase.com
DB_PORT=6543
JWT_SECRET=your_strong_jwt_secret_here
NODE_ENV=production
FRONTEND_URL=https://your-app.vercel.app
```

**Frontend (.env on Vercel):**
```env
REACT_APP_SUPABASE_URL=https://bxnezhlypsnyxyfxdpjn.supabase.co
REACT_APP_ANON_KEY=sb_publishable_zdlACSKsZX-_1VNAIYQxyg_FniVnFDH
REACT_APP_API_URL=https://your-backend.railway.app/api
REACT_APP_AI_SERVICE_URL=https://your-ai-service.railway.app
```

---

## Part 4: Quick Deployment Steps

### 1. Deploy Backend to Railway
```bash
cd backend
railway login
railway init
railway up
# Note the URL: https://your-backend.railway.app
```

### 2. Deploy AI Service to Railway
```bash
cd ai-service
railway init
railway up
# Note the URL: https://your-ai-service.railway.app
```

### 3. Deploy Frontend to Vercel
```bash
cd frontend
vercel login
vercel
# Follow prompts and add environment variables
vercel --prod
# Note the URL: https://your-app.vercel.app
```

### 4. Update CORS Settings
Update backend CORS to allow your Vercel domain:
```javascript
// backend/src/utils/app.js
app.use(cors({
  origin: ['https://your-app.vercel.app', 'http://localhost:3000'],
  credentials: true
}));
```

### 5. Seed Database
```bash
# Connect to your deployed backend
# Run seed script via Railway CLI or manually through SQL
```

---

## Part 5: Post-Deployment

### Test Your Deployment
1. Visit your Vercel URL: `https://your-app.vercel.app`
2. Try logging in with demo credentials
3. Check browser console for any errors
4. Verify API calls are reaching your backend

### Monitor Services
- **Vercel**: Dashboard > Your Project > Deployments
- **Railway**: Dashboard > Your Services > Logs
- **Supabase**: Dashboard > Database > Logs

### Update API URLs
After deployment, update the API service file:

```javascript
// frontend/src/services/api.js
const API_URL = process.env.REACT_APP_API_URL || 'https://your-backend.railway.app/api';
const AI_SERVICE_URL = process.env.REACT_APP_AI_SERVICE_URL || 'https://your-ai-service.railway.app';
```

---

## Troubleshooting

**CORS Errors:**
- Ensure backend CORS includes your Vercel domain
- Check environment variables are set correctly

**Database Connection:**
- Verify Supabase connection string
- Check if IP is whitelisted (Supabase allows all by default)

**Build Failures:**
- Check build logs in Vercel/Railway
- Ensure all dependencies are in package.json
- Verify Node/Python versions

**Environment Variables:**
- Double-check all variables are set
- Restart services after updating variables
- Use production values, not localhost

---

## Cost Estimate (Free Tiers)
- **Supabase**: Free tier (500MB database, 2GB bandwidth)
- **Vercel**: Free tier (100GB bandwidth)
- **Railway**: $5/month credit (enough for 2 small services)

Total: ~$0-5/month for small-scale deployment

---

## Alternative: All-in-One Deployment

If you prefer simpler deployment, consider:
- **Heroku**: Deploy all services together
- **DigitalOcean App Platform**: Full-stack deployment
- **AWS Amplify**: Frontend + backend together

---

## Support
For issues, check:
- Vercel Logs: Dashboard > Deployments > Logs
- Railway Logs: Dashboard > Service > Logs
- Supabase Logs: Dashboard > Database > Logs
