# Quick Deployment Guide

## Step-by-Step Deployment

### 1. Deploy Backend to Railway (5 minutes)

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Navigate to backend
cd backend

# Initialize and deploy
railway init
railway up

# Set environment variables in Railway dashboard
# Copy from backend/.env
```

**Railway Dashboard Environment Variables:**
```
DB_NAME=postgres
DB_USER=postgres.bxnezhlypsnyxyfxdpjn
DB_PASSWORD=your_supabase_password
DB_HOST=aws-0-us-west-1.pooler.supabase.com
DB_PORT=6543
JWT_SECRET=your_jwt_secret_key
NODE_ENV=production
SUPABASE_URL=https://bxnezhlypsnyxyfxdpjn.supabase.co
SUPABASE_ANON_KEY=sb_publishable_zdlACSKsZX-_1VNAIYQxyg_FniVnFDH
```

**Note your backend URL:** `https://your-backend.railway.app`

---

### 2. Deploy AI Service to Railway (5 minutes)

```bash
# Navigate to ai-service
cd ../ai-service

# Initialize and deploy
railway init
railway up
```

**Note your AI service URL:** `https://your-ai-service.railway.app`

---

### 3. Deploy Frontend to Vercel (5 minutes)

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to frontend
cd ../frontend

# Login
vercel login

# Deploy
vercel
```

**When prompted, configure:**
- Set up and deploy: Yes
- Which scope: Your account
- Link to existing project: No
- Project name: gamification-frontend
- Directory: ./
- Override settings: No

**Add environment variables in Vercel dashboard:**
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

**Note your frontend URL:** `https://your-app.vercel.app`

---

### 4. Update CORS in Backend

Update `backend/src/utils/app.js`:
```javascript
app.use(cors({
  origin: ['https://your-app.vercel.app', 'http://localhost:3000'],
  credentials: true
}));
```

Redeploy backend:
```bash
cd backend
railway up
```

---

### 5. Seed Database

```bash
# Option A: Via Railway CLI
cd backend
railway run npm run seed

# Option B: Via Supabase SQL Editor
# Run the seed SQL manually in Supabase dashboard
```

---

## Alternative: One-Click Deploy

### Using Render.com (Easier)

**Backend:**
1. Go to https://render.com
2. New > Web Service
3. Connect GitHub repo
4. Root Directory: `backend`
5. Build: `npm install`
6. Start: `npm start`
7. Add environment variables

**AI Service:**
1. New > Web Service
2. Root Directory: `ai-service`
3. Build: `pip install -r requirements.txt`
4. Start: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

**Frontend:**
Same Vercel steps as above

---

## Verify Deployment

1. Visit your Vercel URL
2. Login with: `student@demo.com` / `password`
3. Check browser console for errors
4. Test quiz functionality

---

## Costs

- **Supabase**: Free (Database only)
- **Railway**: $5/month credit (covers 2 services)
- **Vercel**: Free
- **Total**: ~$0-5/month
