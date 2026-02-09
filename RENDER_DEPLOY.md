# Deploy to Render.com (FREE)

## STEP 1: Deploy Backend

1. Go to https://render.com/
2. Sign up with GitHub
3. Click **"New +"** > **"Web Service"**
4. Connect your GitHub repository: **gamification-in-learning**
5. Configure:
   - **Name**: `gamification-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

6. Add Environment Variables:
```
PORT=3001
DB_NAME=postgres
DB_USER=postgres.bxnezhlypsnyxyfxdpjn
DB_PASSWORD=YOUR_SUPABASE_PASSWORD
DB_HOST=aws-0-us-west-1.pooler.supabase.com
DB_PORT=6543
JWT_SECRET=super_secret_jwt_key_12345
NODE_ENV=production
SUPABASE_URL=https://bxnezhlypsnyxyfxdpjn.supabase.co
SUPABASE_ANON_KEY=sb_publishable_zdlACSKsZX-_1VNAIYQxyg_FniVnFDH
```

7. Click **"Create Web Service"**
8. Wait for deployment (5-10 minutes)
9. Copy your backend URL: `https://gamification-backend.onrender.com`

---

## STEP 2: Deploy AI Service

1. Click **"New +"** > **"Web Service"**
2. Select same repository
3. Configure:
   - **Name**: `gamification-ai-service`
   - **Root Directory**: `ai-service`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - **Instance Type**: `Free`

4. Click **"Create Web Service"**
5. Copy your AI service URL: `https://gamification-ai-service.onrender.com`

---

## STEP 3: Deploy Frontend to Vercel

1. Go to https://vercel.com/
2. Sign up with GitHub
3. Click **"Add New"** > **"Project"**
4. Import your repository: **gamification-in-learning**
5. Configure:
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

6. Add Environment Variables:
```
REACT_APP_SUPABASE_URL=https://bxnezhlypsnyxyfxdpjn.supabase.co
REACT_APP_ANON_KEY=sb_publishable_zdlACSKsZX-_1VNAIYQxyg_FniVnFDH
REACT_APP_API_URL=https://gamification-backend.onrender.com/api
REACT_APP_AI_SERVICE_URL=https://gamification-ai-service.onrender.com
```

7. Click **"Deploy"**
8. Copy your frontend URL: `https://gamification-frontend.vercel.app`

---

## STEP 4: Update Backend CORS

After getting your Vercel URL, update backend CORS:

Edit `backend/src/utils/app.js`:
```javascript
app.use(cors({
  origin: [
    'https://your-vercel-url.vercel.app',
    'http://localhost:3000'
  ],
  credentials: true
}));
```

Commit and push:
```bash
git add .
git commit -m "Update CORS for production"
git push
```

Render will auto-redeploy.

---

## STEP 5: Seed Database

Once backend is deployed, seed the database:

Go to Render dashboard > Your backend service > Shell

Run:
```bash
npm run seed
```

---

## Summary

✅ Backend: https://gamification-backend.onrender.com
✅ AI Service: https://gamification-ai-service.onrender.com
✅ Frontend: https://your-app.vercel.app
✅ Database: Supabase (already configured)

---

## Important Notes

- Render free tier spins down after 15 minutes of inactivity
- First request after spin-down takes 30-60 seconds
- Vercel is always fast (no spin-down)
- Total cost: **$0/month**

---

## Demo Credentials

- Student: `student@demo.com` / `password`
- Teacher: `teacher@demo.com` / `password`
- Admin: `admin@demo.com` / `password`
