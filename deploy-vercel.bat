@echo off
echo Deploying Frontend to Vercel...

cd frontend

echo Installing Vercel CLI...
npm install -g vercel

echo Deploying to Vercel...
vercel --prod

echo.
echo Frontend deployed to Vercel!
echo Update backend CORS settings with the Vercel URL.

cd ..
pause