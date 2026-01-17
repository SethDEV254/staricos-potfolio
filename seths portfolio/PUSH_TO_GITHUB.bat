@echo off
echo.
echo ========================================
echo   PUSH SETH CRYPTOLORD PORTFOLIO
echo   TO GITHUB: seth-dev254
echo ========================================
echo.

cd "seths portfolio"

echo Initializing Git repository...
git init

echo.
echo Adding all files...
git add .

echo.
echo Creating commit...
git commit -m "Initial commit: Seth Cryptolord Portfolio - Professional trader, CEO of MetaHub Academy & BullBear Trading"

echo.
echo Setting up remote repository...
git branch -M main
git remote add origin https://github.com/seth-dev254/seth-cryptolord-portfolio.git

echo.
echo Pushing to GitHub...
git push -u origin main

echo.
echo ========================================
echo   PUSH COMPLETE!
echo ========================================
echo.
echo Your portfolio is now on GitHub!
echo Repository: https://github.com/seth-dev254/seth-cryptolord-portfolio
echo.
echo NEXT STEPS:
echo 1. Go to GitHub repository settings
echo 2. Enable GitHub Pages
echo 3. Select 'main' branch as source
echo 4. Your site will be live at:
echo    https://seth-dev254.github.io/seth-cryptolord-portfolio
echo.
pause
