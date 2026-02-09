@echo off
echo Starting Railway Deployment...

echo.
echo Step 1: Make sure you have Railway CLI installed
echo If not, run: npm install -g @railway/cli
echo.

echo Step 2: Login to Railway
railway login

echo.
echo Step 3: Create new Railway project
railway new

echo.
echo Step 4: Deploy Backend Service
cd backend
railway up --service backend
cd ..

echo.
echo Step 5: Deploy AI Service  
cd ai-service
railway up --service ai-service
cd ..

echo.
echo Step 6: Deploy Frontend Service
cd frontend
railway up --service frontend
cd ..

echo.
echo Deployment initiated! Check Railway dashboard for URLs and set environment variables.
echo.
echo Next steps:
echo 1. Get service URLs from Railway dashboard
echo 2. Update environment variables with actual URLs
echo 3. Redeploy services with updated environment variables
echo.
pause