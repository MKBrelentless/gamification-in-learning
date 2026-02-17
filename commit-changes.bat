@echo off
echo Committing all changes...
git add -A
git commit -m "Fix: Railway deployment - update pydantic to v1, fix QA models, add Railway configs"
git push
echo Done!
pause
