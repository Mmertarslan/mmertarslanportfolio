@echo off
where npm >nul 2>nul || (echo Node.js kurulu degil. nodejs.org adresinden LTS surumunu kur. & pause & exit /b)
call npm install
call npm run dev
pause
