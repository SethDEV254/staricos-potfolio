@echo off
title Push to Staricos Portfolio
color 0A

echo.
echo ═══════════════════════════════════════════════════════════════
echo   🚀 PUSH TO STARICOS-PORTFOLIO
echo ═══════════════════════════════════════════════════════════════
echo.
echo   Repository: https://github.com/dollarpath1/staricos-portfolio
echo.
echo ═══════════════════════════════════════════════════════════════
echo.

echo Checking if repository exists...
echo.

git ls-remote origin >nul 2>&1
if errorlevel 1 (
    echo ❌ Repository not found!
    echo.
    echo PLEASE CREATE IT FIRST:
    echo.
    echo 1. Go to: https://github.com/new
    echo 2. Name: staricos-portfolio
    echo 3. Click "Create repository"
    echo 4. Then run this script again
    echo.
    echo Opening GitHub in browser...
    timeout /t 2 >nul
    start https://github.com/new
    echo.
    pause
    exit /b 1
)

echo ✅ Repository found!
echo.
echo Pushing to GitHub...
echo.

git push -u origin master

if errorlevel 1 (
    echo.
    echo ⚠️  Push to 'master' failed. Trying 'main'...
    git branch -M main
    git push -u origin main
    
    if errorlevel 1 (
        echo.
        echo ═══════════════════════════════════════════════════════════════
        echo   ❌ PUSH FAILED
        echo ═══════════════════════════════════════════════════════════════
        echo.
        echo AUTHENTICATION NEEDED:
        echo.
        echo Username: dollarpath1
        echo Password: Use Personal Access Token
        echo.
        echo Get token: https://github.com/settings/tokens
        echo.
        echo ═══════════════════════════════════════════════════════════════
        pause
        exit /b 1
    )
)

echo.
echo ═══════════════════════════════════════════════════════════════
echo   ✅ SUCCESS! PUSHED TO GITHUB! 🎉
echo ═══════════════════════════════════════════════════════════════
echo.
echo Your portfolio is now at:
echo https://github.com/dollarpath1/staricos-portfolio
echo.
echo NEXT STEPS:
echo 1. Enable GitHub Pages (Settings ^> Pages)
echo 2. Your site will be live at:
echo    https://dollarpath1.github.io/staricos-portfolio
echo.
echo ═══════════════════════════════════════════════════════════════
echo.

echo Opening repository in browser...
timeout /t 2 >nul
start https://github.com/dollarpath1/staricos-portfolio

echo.
pause
