@echo off
echo ========================================
echo Deploying All Changes
echo ========================================
echo.

echo Committing changes...
git add -A
git commit -m "feat: Add forgot password, fix admin dashboard, real-time leaderboard, enhanced gamification, quiz generator, login UI improvements"

echo.
echo Pushing to GitHub...
git push

echo.
echo ========================================
echo Deployment Complete!
echo ========================================
echo.
echo Changes deployed:
echo - Forgot password feature
echo - Fixed admin dashboard user loading
echo - Real-time leaderboard (no dummy data)
echo - Enhanced gamification (missions, quests, streaks)
echo - Auto quiz generator
echo - Login UI improvements (title stays visible)
echo - Password reset model
echo.
echo Services will auto-deploy on Render
echo Monitor at: https://dashboard.render.com
echo.
pause
