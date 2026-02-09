# Railway Deployment - Direct Method

## Backend Deployment

### Option 1: Using Railway CLI (Recommended)

1. **Open Command Prompt in backend folder:**
```bash
cd backend
```

2. **Login to Railway:**
```bash
railway login
```
- Browser will open
- Login with GitHub/Email
- Return to terminal

3. **Create new project:**
```bash
railway init
```
- Enter project name: `gamification-backend`

4. **Set environment variables:**
```bash
railway variables set PORT=3001
railway variables set DB_NAME=postgres
railway variables set DB_USER=postgres.bxnezhlypsnyxyfxdpjn
railway variables set DB_PASSWORD=YOUR_SUPABASE_PASSWORD
railway variables set DB_HOST=aws-0-us-west-1.pooler.supabase.com
railway variables set DB_PORT=6543
railway variables set JWT_SECRET=your_secret_key_here
railway variables set NODE_ENV=production
railway variables set SUPABASE_URL=https://bxnezhlypsnyxyfxdpjn.supabase.co
railway variables set SUPABASE_ANON_KEY=sb_publishable_zdlACSKsZX-_1VNAIYQxyg_FniVnFDH
```

5. **Deploy:**
```bash
railway up
```

6. **Generate public URL:**
```bash
railway domain
```

---

### Option 2: Using Railway Dashboard (Easier)

1. Go to https://railway.app/new
2. Click "Empty Project"
3. Click "Deploy from GitHub repo" or "Deploy from local"
4. If local: Install Railway CLI and run `railway up` from backend folder

---

## AI Service Deployment

Same steps as backend, but from `ai-service` folder:

```bash
cd ai-service
railway init
railway up
railway domain
```

---

## Frontend Deployment to Vercel

### Using Vercel CLI:

1. **Open Command Prompt in frontend folder:**
```bash
cd frontend
```

2. **Login:**
```bash
vercel login
```

3. **Deploy:**
```bash
vercel
```

4. **Add environment variables in Vercel dashboard**

5. **Deploy to production:**
```bash
vercel --prod
```

---

## Quick Commands Summary

```bash
# Backend
cd backend
railway login
railway init
railway up
railway domain

# AI Service
cd ../ai-service
railway init
railway up
railway domain

# Frontend
cd ../frontend
vercel login
vercel
vercel --prod
```
