@echo off
title Push to Sethdev Staricos Portfolio
color 0A

echo.
echo ═══════════════════════════════════════════════════════════════
echo   🚀 PUSH TO SETHDEV'S STARICOS-PORTFOLIO
echo ═══════════════════════════════════════════════════════════════
echo.

echo Please provide the exact repository URL.
echo.
echo Example formats:
echo   https://github.com/sethdev/staricos-portfolio.git
echo   https://github.com/seth-dev/staricos-portfolio.git
echo   https://github.com/USERNAME/staricos-portfolio.git
echo.

set /p REPO_URL="Enter the repository URL: "

if "%REPO_URL%"=="" (
    echo.
    echo ❌ No URL provided!
    pause
    exit /b 1
)

echo.
echo Removing old remote...
git remote remove origin 2>nul

echo Adding new remote...
git remote add origin %REPO_URL%

if errorlevel 1 (
    echo ❌ Failed to add remote
    pause
    exit /b 1
)

echo ✅ Remote added!
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
        echo POSSIBLE ISSUES:
        echo.
        echo 1. Repository doesn't exist
        echo    - Check the URL is correct
        echo    - Make sure repo exists on GitHub
        echo.
        echo 2. Authentication failed
        echo    - Use Personal Access Token as password
        echo    - Get token: https://github.com/settings/tokens
        echo.
        echo 3. No permission
        echo    - Make sure you have write access to the repo
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
echo Your portfolio has been pushed!
echo.
echo NEXT STEPS:
echo 1. Visit the repository on GitHub
echo 2. Enable GitHub Pages if needed
echo 3. Share your portfolio!
echo.
echo ═══════════════════════════════════════════════════════════════
echo.
pause
