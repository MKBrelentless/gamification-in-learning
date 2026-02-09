# Deploy Everything on Vercel (EASIEST)

Vercel supports both Node.js and React, and has no IPv6 issues.

## Step 1: Deploy Backend on Vercel

```bash
cd backend
vercel
```

When prompted:
- Set up and deploy: **Y**
- Project name: **gamification-backend**
- Directory: **./  **
- Override settings: **N**

Add environment variables in Vercel dashboard:
```
DATABASE_URL=postgresql://postgres:@254Relentless254@db.bxnezhlypsnyxyfxdpjn.supabase.co:5432/postgres
PORT=3001
JWT_SECRET=gamification_jwt_secret_key_2024
NODE_ENV=production
SUPABASE_URL=https://bxnezhlypsnyxyfxdpjn.supabase.co
SUPABASE_ANON_KEY=sb_publishable_zdlACSKsZX-_1VNAIYQxyg_FniVnFDH
```

Deploy to production:
```bash
vercel --prod
```

Copy backend URL: `https://gamification-backend.vercel.app`

---

## Step 2: Deploy Frontend on Vercel

```bash
cd ../frontend
vercel
```

Add environment variables:
```
REACT_APP_SUPABASE_URL=https://bxnezhlypsnyxyfxdpjn.supabase.co
REACT_APP_ANON_KEY=sb_publishable_zdlACSKsZX-_1VNAIYQxyg_FniVnFDH
REACT_APP_API_URL=https://gamification-backend.vercel.app/api
```

Deploy to production:
```bash
vercel --prod
```

---

## Done!

Both services on Vercel = No IPv6 issues! ✅
