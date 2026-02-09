@echo off
echo Starting Railway deployment for Gamification Platform...

REM Check if Railway CLI is installed
railway --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Railway CLI not found. Installing...
    npm install -g @railway/cli
)

echo.
echo Logging into Railway...
railway login

echo.
echo Creating new Railway project...
railway project new gamification-platform

echo.
echo Setting up Backend Service...
cd backend
railway service new backend
railway up --service backend
railway variables set NODE_ENV=production --service backend
railway variables set PORT=3001 --service backend
cd ..

echo.
echo Setting up Frontend Service...
cd frontend
railway service new frontend
railway up --service frontend
railway variables set NODE_ENV=production --service frontend
railway variables set PORT=3000 --service frontend
cd ..

echo.
echo Setting up AI Service...
cd ai-service
railway service new ai-service
railway up --service ai-service
railway variables set PYTHON_VERSION=3.11 --service ai-service
cd ..

echo.
echo Setting up PostgreSQL Database...
railway add postgresql

echo.
echo Deployment completed! Check your Railway dashboard for service URLs.
echo Don't forget to:
echo 1. Update environment variables with actual database credentials
echo 2. Set CORS origins in your services to match deployed URLs
echo 3. Update API endpoints in frontend to point to deployed backend
pause