@echo off
echo ========================================
echo STEP 1: Deploy Backend to Railway
echo ========================================
echo.
echo Opening Railway login...
start https://railway.app/login
echo.
echo After logging in to Railway:
echo 1. Click "New Project"
echo 2. Select "Deploy from GitHub repo" OR "Empty Project"
echo 3. If Empty Project, we'll push code manually
echo.
pause
echo.
echo Now let's initialize Railway in backend folder...
cd backend
railway login
railway init
echo.
echo Setting environment variables...
echo Please add these in Railway dashboard:
echo.
echo PORT=3001
echo DB_NAME=postgres
echo DB_USER=postgres.bxnezhlypsnyxyfxdpjn
echo DB_PASSWORD=YOUR_SUPABASE_PASSWORD_HERE
echo DB_HOST=aws-0-us-west-1.pooler.supabase.com
echo DB_PORT=6543
echo JWT_SECRET=your_strong_secret_key_change_this
echo NODE_ENV=production
echo SUPABASE_URL=https://bxnezhlypsnyxyfxdpjn.supabase.co
echo SUPABASE_ANON_KEY=sb_publishable_zdlACSKsZX-_1VNAIYQxyg_FniVnFDH
echo.
pause
echo.
echo Deploying backend...
railway up
echo.
echo Copy your backend URL from Railway dashboard!
echo.
pause

echo ========================================
echo STEP 2: Deploy AI Service to Railway
echo ========================================
cd ..\ai-service
railway init
echo.
echo Deploying AI service...
railway up
echo.
echo Copy your AI service URL from Railway dashboard!
echo.
pause

echo ========================================
echo STEP 3: Deploy Frontend to Vercel
echo ========================================
cd ..\frontend
vercel login
echo.
echo Deploying to Vercel...
vercel
echo.
echo After deployment, add these environment variables in Vercel dashboard:
echo.
echo REACT_APP_SUPABASE_URL=https://bxnezhlypsnyxyfxdpjn.supabase.co
echo REACT_APP_ANON_KEY=sb_publishable_zdlACSKsZX-_1VNAIYQxyg_FniVnFDH
echo REACT_APP_API_URL=https://YOUR_BACKEND_URL.railway.app/api
echo REACT_APP_AI_SERVICE_URL=https://YOUR_AI_SERVICE_URL.railway.app
echo.
pause
echo.
echo Deploying to production...
vercel --prod
echo.
echo ========================================
echo DEPLOYMENT COMPLETE!
echo ========================================
echo.
echo Your URLs:
echo Frontend: Check Vercel dashboard
echo Backend: Check Railway dashboard
echo AI Service: Check Railway dashboard
echo.
pause
