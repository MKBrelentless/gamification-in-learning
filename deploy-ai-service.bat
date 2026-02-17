@echo off
echo ========================================
echo Deploy AI Service to Railway
echo ========================================
echo.

cd ai-service

echo Step 1: Login to Railway
railway login

echo.
echo Step 2: Link to your existing Railway project
railway link

echo.
echo Step 3: Deploy AI Service
railway up

echo.
echo ========================================
echo Deployment Complete!
echo ========================================
echo.
echo Next Steps:
echo 1. Go to Railway dashboard
echo 2. Add environment variables:
echo    - PYTHON_VERSION=3.9
echo    - FRONTEND_URL=your-frontend-url
echo    - BACKEND_URL=your-backend-url
echo 3. Service will auto-redeploy
echo.
echo Test: https://your-ai-service.railway.app/health
echo.
pause
