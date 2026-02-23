@echo off
echo Starting Backend...
cd /d "%~dp0"
"C:\Program Files\nodejs\node.exe" src/utils/server.js
pause
