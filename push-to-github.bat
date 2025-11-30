@echo off
echo ========================================
echo   Push Portfolio to GitHub
echo ========================================
echo.

REM Check if git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Git is not installed!
    echo Please install Git from: https://git-scm.com/
    pause
    exit /b 1
)

echo Step 1: Initializing Git repository...
git init

echo.
echo Step 2: Adding all files...
git add .

echo.
echo Step 3: Creating initial commit...
git commit -m "Initial commit: Full-stack portfolio with backend"

echo.
echo ========================================
echo   Push to dollarpath1
echo ========================================
echo.
set /p DOLLARPATH_REPO="Enter dollarpath1 repo URL (or press Enter to skip): "
if not "%DOLLARPATH_REPO%"=="" (
    git remote add dollarpath %DOLLARPATH_REPO%
    echo Pushing to dollarpath1...
    git push -u dollarpath main
    echo.
    echo ✓ Pushed to dollarpath1!
)

echo.
echo ========================================
echo   Push to sethdev254
echo ========================================
echo.
set /p SETHDEV_REPO="Enter sethdev254 repo URL (or press Enter to skip): "
if not "%SETHDEV_REPO%"=="" (
    git remote add sethdev %SETHDEV_REPO%
    echo Pushing to sethdev254...
    git push -u sethdev main
    echo.
    echo ✓ Pushed to sethdev254!
)

echo.
echo ========================================
echo   All Done!
echo ========================================
echo.
echo Your portfolio has been pushed to GitHub!
echo.
echo Next steps:
echo 1. Visit your repositories on GitHub
echo 2. Enable GitHub Pages (optional)
echo 3. Deploy backend to Railway/Heroku
echo.
pause
