@echo off
title Deploy to Vercel
color 0A

echo.
echo ═══════════════════════════════════════════════════════════════
echo   🚀 DEPLOY TO VERCEL
echo ═══════════════════════════════════════════════════════════════
echo.
echo   Your portfolio is ready to deploy!
echo.
echo ═══════════════════════════════════════════════════════════════
echo.

echo Opening Vercel deployment page...
echo.
echo STEPS:
echo 1. Sign in with GitHub
echo 2. Import: SethDEV254/staricos-potfolio
echo 3. Click "Deploy"
echo 4. Done! ✅
echo.

timeout /t 3 >nul

start https://vercel.com/new

echo.
echo ═══════════════════════════════════════════════════════════════
echo   📋 DEPLOYMENT SETTINGS
echo ═══════════════════════════════════════════════════════════════
echo.
echo   Project Name: staricos-portfolio
echo   Framework: Other
echo   Root Directory: ./
echo   Build Command: (leave empty)
echo   Output Directory: ./
echo.
echo ═══════════════════════════════════════════════════════════════
echo   ✅ AFTER DEPLOYMENT
echo ═══════════════════════════════════════════════════════════════
echo.
echo   Your site will be live at:
echo   https://staricos-portfolio.vercel.app
echo.
echo   Features:
echo   ✅ Automatic HTTPS
echo   ✅ Global CDN
echo   ✅ Auto-deploy on push
echo   ✅ Custom domain support
echo.
echo ═══════════════════════════════════════════════════════════════
echo.
echo   Read DEPLOY_VERCEL.md for detailed instructions
echo.
echo ═══════════════════════════════════════════════════════════════
echo.
pause
