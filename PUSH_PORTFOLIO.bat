@echo off
title Push Portfolio to GitHub
color 0A

echo.
echo ═══════════════════════════════════════════════════════════════
echo   🚀 PUSH PORTFOLIO TO GITHUB
echo ═══════════════════════════════════════════════════════════════
echo.

REM Check if remote exists
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo ❌ No GitHub repository connected yet!
    echo.
    echo PLEASE DO THIS FIRST:
    echo.
    echo 1. Go to: https://github.com/new
    echo 2. Create repository: dollarpath-portfolio
    echo 3. Copy the repository URL
    echo.
    set /p REPO_URL="Paste your repository URL here: "
    
    if "!REPO_URL!"=="" (
        echo ❌ No URL provided. Exiting...
        pause
        exit /b 1
    )
    
    echo.
    echo Adding remote repository...
    git remote add origin !REPO_URL!
    
    if errorlevel 1 (
        echo ❌ Failed to add remote
        pause
        exit /b 1
    )
    
    echo ✅ Remote added!
    echo.
)

echo ✅ GitHub repository connected
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
        echo 1. Authentication failed
        echo    Solution: Use Personal Access Token as password
        echo    Get token: https://github.com/settings/tokens
        echo.
        echo 2. Repository doesn't exist
        echo    Solution: Create it at https://github.com/new
        echo.
        echo 3. Network issue
        echo    Solution: Check internet connection
        echo.
        echo ═══════════════════════════════════════════════════════════════
        pause
        exit /b 1
    )
)

echo.
echo ═══════════════════════════════════════════════════════════════
echo   ✅ SUCCESS! PORTFOLIO PUSHED TO GITHUB! 🎉
echo ═══════════════════════════════════════════════════════════════
echo.
echo Your portfolio is now on GitHub!
echo.
echo WHAT'S INCLUDED:
echo ✅ Portfolio website
echo ✅ Backend API
echo ✅ Dollarpath portfolio
echo ✅ Documentation
echo.
echo NEXT STEPS:
echo 1. Visit your GitHub repository
echo 2. Enable GitHub Pages (Settings ^> Pages)
echo 3. Your site will be live!
echo.
echo ═══════════════════════════════════════════════════════════════
echo.

REM Get the remote URL and open in browser
for /f "tokens=*" %%i in ('git remote get-url origin') do set REMOTE_URL=%%i
set BROWSER_URL=%REMOTE_URL:git@github.com:=https://github.com/%
set BROWSER_URL=%BROWSER_URL:.git=%

echo Opening your repository in browser...
timeout /t 2 >nul
start %BROWSER_URL%

echo.
pause
