# Alternative Deployment - All on Vercel

Render's free tier has IPv6 connectivity issues with Supabase. Let's deploy everything on Vercel instead.

## ✅ Deploy Backend + Frontend on Vercel

### Step 1: Update Backend for Vercel Serverless

Create `api` folder structure for Vercel serverless functions.

### Step 2: Deploy to Vercel

1. Go to https://vercel.com/new
2. Import your repository
3. Deploy as monorepo with both frontend and backend

## OR Use Netlify (Better Free Tier)

Netlify has better IPv4/IPv6 handling.

### Deploy Backend to Netlify

1. Go to https://app.netlify.com/
2. New site from Git
3. Select repository
4. Base directory: `backend`
5. Build command: `npm install`
6. Publish directory: `.`
7. Add environment variables
8. Deploy

### Deploy Frontend to Vercel

1. Go to https://vercel.com/new
2. Import repository  
3. Root directory: `frontend`
4. Deploy

This avoids the IPv6 issue completely!
