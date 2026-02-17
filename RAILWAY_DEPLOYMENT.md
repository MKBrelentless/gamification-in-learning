# Railway Deployment Guide - Gamification Platform

## Prerequisites
- Railway account (https://railway.app)
- Git repository with your code
- Railway CLI installed: `npm install -g @railway/cli`

## Step 1: Create Railway Project

1. Go to https://railway.app/new
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Connect your GitHub repository

## Step 2: Add PostgreSQL Database

1. In your Railway project dashboard
2. Click "+ New"
3. Select "Database" → "Add PostgreSQL"
4. Railway will provision a PostgreSQL database
5. Note: Database credentials are auto-injected as environment variables

## Step 3: Deploy Backend Service

1. Click "+ New" → "GitHub Repo"
2. Select your repository
3. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

4. Add Environment Variables:
   ```
   NODE_ENV=production
   PORT=3001
   DATABASE_URL=${{Postgres.DATABASE_URL}}
   JWT_SECRET=your-super-secret-jwt-key-change-this
   ```

5. Click "Deploy"

## Step 4: Deploy Frontend Service

1. Click "+ New" → "GitHub Repo"
2. Select your repository again
3. Configure:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npx serve -s build -l $PORT`

4. Add Environment Variables:
   ```
   NODE_ENV=production
   REACT_APP_API_URL=https://your-backend-url.railway.app
   REACT_APP_SUPABASE_URL=https://bxnezhlypsnyxyfxdpjn.supabase.co
   REACT_APP_ANNON_KEY=sb_publishable_zdlACSKsZX-_1VNAIYQxyg_FniVnFDH
   ```

5. Click "Deploy"

## Step 5: Deploy AI Service

1. Click "+ New" → "GitHub Repo"
2. Select your repository again
3. Configure:
   - **Root Directory**: `ai-service`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

4. Add Environment Variables:
   ```
   PYTHON_VERSION=3.9
   FRONTEND_URL=https://your-frontend-url.railway.app
   BACKEND_URL=https://your-backend-url.railway.app
   ```

5. Click "Deploy"

## Step 6: Update Service URLs

After all services are deployed:

1. Copy each service's public URL from Railway dashboard
2. Update environment variables:
   - **Frontend**: Update `REACT_APP_API_URL` with backend URL
   - **AI Service**: Update `FRONTEND_URL` and `BACKEND_URL`
3. Redeploy services if needed

## Step 7: Seed Database

1. Go to Backend service in Railway
2. Click "Settings" → "Variables"
3. Ensure DATABASE_URL is set
4. Open Railway CLI in your local backend folder:
   ```bash
   railway login
   railway link
   railway run npm run seed
   ```

## Verification

Test your deployment:
- Frontend: https://your-frontend-url.railway.app
- Backend: https://your-backend-url.railway.app/api/health
- AI Service: https://your-ai-service-url.railway.app/health

## Troubleshooting

**Build Fails:**
- Check build logs in Railway dashboard
- Verify root directory is set correctly
- Ensure all dependencies are in package.json/requirements.txt

**Database Connection Issues:**
- Verify DATABASE_URL is set in backend
- Check PostgreSQL service is running
- Review connection logs

**CORS Errors:**
- Update CORS origins in backend and AI service
- Add deployed URLs to allowed origins

**Environment Variables:**
- Double-check all URLs are correct
- No trailing slashes in URLs
- JWT_SECRET must be set

## Cost Optimization

Railway offers:
- $5 free credit monthly
- Pay-as-you-go pricing
- Sleep inactive services to save costs

## Monitoring

- View logs: Click service → "Logs" tab
- Metrics: Click service → "Metrics" tab
- Set up alerts in Railway dashboard
