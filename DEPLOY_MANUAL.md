# Manual Deployment Steps

## STEP 1: Deploy Backend to Railway

### 1.1 Login to Railway
```bash
cd backend
railway login
```
This will open your browser. Login with GitHub or email.

### 1.2 Initialize Railway Project
```bash
railway init
```
- Project name: `gamification-backend`
- Press Enter

### 1.3 Add Environment Variables
```bash
railway open
```
This opens Railway dashboard. Go to Variables tab and add:

```
PORT=3001
DB_NAME=postgres
DB_USER=postgres.bxnezhlypsnyxyfxdpjn
DB_PASSWORD=YOUR_SUPABASE_PASSWORD
DB_HOST=aws-0-us-west-1.pooler.supabase.com
DB_PORT=6543
JWT_SECRET=super_secret_jwt_key_change_this_in_production
NODE_ENV=production
SUPABASE_URL=https://bxnezhlypsnyxyfxdpjn.supabase.co
SUPABASE_ANON_KEY=sb_publishable_zdlACSKsZX-_1VNAIYQxyg_FniVnFDH
```

### 1.4 Deploy
```bash
railway up
```

### 1.5 Get Backend URL
In Railway dashboard, go to Settings > Domains > Generate Domain

**Save this URL:** `https://gamification-backend-production.up.railway.app`

---

## STEP 2: Deploy AI Service to Railway

### 2.1 Initialize Railway Project
```bash
cd ../ai-service
railway init
```
- Project name: `gamification-ai-service`

### 2.2 Deploy
```bash
railway up
```

### 2.3 Get AI Service URL
In Railway dashboard, go to Settings > Domains > Generate Domain

**Save this URL:** `https://gamification-ai-production.up.railway.app`

---

## STEP 3: Seed Database

### 3.1 Seed via Railway
```bash
cd ../backend
railway run npm run seed
```

---

## STEP 4: Deploy Frontend to Vercel

### 4.1 Login to Vercel
```bash
cd ../frontend
vercel login
```
This will open your browser. Login with GitHub or email.

### 4.2 Deploy
```bash
vercel
```

Answer the prompts:
- Set up and deploy: **Y**
- Which scope: **[Your account]**
- Link to existing project: **N**
- Project name: **gamification-frontend**
- Directory: **./  (just press Enter)**
- Override settings: **N**

### 4.3 Add Environment Variables in Vercel

Go to: https://vercel.com/dashboard

1. Click your project
2. Settings > Environment Variables
3. Add these variables:

```
REACT_APP_SUPABASE_URL=https://bxnezhlypsnyxyfxdpjn.supabase.co
REACT_APP_ANON_KEY=sb_publishable_zdlACSKsZX-_1VNAIYQxyg_FniVnFDH
REACT_APP_API_URL=https://YOUR_BACKEND_URL.railway.app/api
REACT_APP_AI_SERVICE_URL=https://YOUR_AI_SERVICE_URL.railway.app
```

Replace `YOUR_BACKEND_URL` and `YOUR_AI_SERVICE_URL` with the URLs from Step 1 and 2.

### 4.4 Deploy to Production
```bash
vercel --prod
```

**Save this URL:** `https://gamification-frontend.vercel.app`

---

## STEP 5: Update Backend CORS

### 5.1 Update CORS Configuration
Edit `backend/src/utils/app.js`:

Find the line:
```javascript
app.use(cors());
```

Replace with:
```javascript
app.use(cors({
  origin: [
    'https://YOUR_VERCEL_URL.vercel.app',
    'http://localhost:3000'
  ],
  credentials: true
}));
```

### 5.2 Redeploy Backend
```bash
cd backend
railway up
```

---

## STEP 6: Test Your Deployment

1. Open your Vercel URL: `https://your-app.vercel.app`
2. Login with:
   - Email: `student@demo.com`
   - Password: `password`
3. Test features

---

## Troubleshooting

### If Railway login doesn't work:
1. Go to https://railway.app
2. Create account
3. Create "New Project" > "Empty Project"
4. Click "Deploy from GitHub" and connect your repo

### If Vercel login doesn't work:
1. Go to https://vercel.com
2. Create account
3. Click "Add New" > "Project"
4. Import your GitHub repo
5. Set Root Directory to `frontend`

---

## Summary of URLs

After deployment, you should have:

- ✅ Backend: `https://_____.railway.app`
- ✅ AI Service: `https://_____.railway.app`
- ✅ Frontend: `https://_____.vercel.app`
- ✅ Database: Supabase (already configured)

---

## Demo Credentials

- Admin: `admin@demo.com` / `password`
- Teacher: `teacher@demo.com` / `password`
- Student: `student@demo.com` / `password`
