@echo off
echo ========================================
echo Commit and Deploy Changes
echo ========================================
echo.

echo Step 1: Adding all changes...
git add -A

echo.
echo Step 2: Committing changes...
git commit -m "feat: Add enhanced gamification (missions, quests, streaks, team challenges, auto-quiz generator)"

echo.
echo Step 3: Pushing to GitHub...
git push

echo.
echo ========================================
echo Changes pushed to GitHub!
echo ========================================
echo.
echo Your services will auto-deploy:
echo - Backend (Render): Will redeploy automatically
echo - Frontend (Render): Will redeploy automatically
echo - AI Service (Render): Will redeploy automatically
echo.
echo Monitor deployments at:
echo https://dashboard.render.com
echo.
pause
