@echo off
echo ========================================
echo Railway Fresh Deployment Script
echo ========================================
echo.

REM Check Railway CLI
railway --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Installing Railway CLI...
    npm install -g @railway/cli
)

echo Step 1: Login to Railway
railway login

echo.
echo Step 2: Create new project
echo Please create a new project in Railway dashboard: https://railway.app/new
echo Then come back here and press any key...
pause

echo.
echo Step 3: Link to Railway project
railway link

echo.
echo Step 4: Add PostgreSQL database
echo Go to Railway dashboard and add PostgreSQL database
echo Click: + New -^> Database -^> Add PostgreSQL
echo Press any key when done...
pause

echo.
echo Step 5: Deploy Backend
cd backend
railway up
cd ..

echo.
echo Step 6: Deploy Frontend  
cd frontend
railway up
cd ..

echo.
echo Step 7: Deploy AI Service
cd ai-service
railway up
cd ..

echo.
echo ========================================
echo Deployment Complete!
echo ========================================
echo.
echo Next Steps:
echo 1. Go to Railway dashboard
echo 2. Set environment variables for each service
echo 3. Update service URLs in environment variables
echo 4. Run: railway run npm run seed (in backend folder)
echo.
pause
