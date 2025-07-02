@echo off
echo.
echo ========================================
echo  GitHub Repository Setup Script
echo ========================================
echo.

REM Check if git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Git is not installed or not in PATH
    echo Please install Git from https://git-scm.com/
    pause
    exit /b 1
)

echo ✅ Git is installed

REM Get repository details from user
set /p GITHUB_USERNAME="Enter your GitHub username: "
set /p REPO_NAME="Enter repository name (e.g., cypress-bdd-framework): "

echo.
echo Creating repository: https://github.com/%GITHUB_USERNAME%/%REPO_NAME%
echo.

REM Initialize Git if not already done
if not exist ".git" (
    echo 🔧 Initializing Git repository...
    git init
)

REM Add all files
echo 📁 Adding files to Git...
git add .

REM Check if there are changes to commit
git diff --staged --quiet
if errorlevel 1 (
    echo 💾 Creating initial commit...
    git commit -m "Initial commit: Cypress BDD framework with central configuration"
) else (
    echo ℹ️  No changes to commit
)

REM Add remote origin
echo 🔗 Adding GitHub remote...
git remote remove origin >nul 2>&1
git remote add origin https://github.com/%GITHUB_USERNAME%/%REPO_NAME%.git

REM Set main branch and push
echo 🚀 Pushing to GitHub...
git branch -M main
git push -u origin main

if errorlevel 0 (
    echo.
    echo ✅ SUCCESS! Repository uploaded to GitHub
    echo 🌐 View at: https://github.com/%GITHUB_USERNAME%/%REPO_NAME%
    echo.
    echo Next steps:
    echo 1. Go to your repository on GitHub
    echo 2. Add topics: cypress, bdd, cucumber, testing, automation
    echo 3. Star your own repo! ⭐
) else (
    echo.
    echo ❌ Failed to push to GitHub
    echo.
    echo Possible issues:
    echo 1. Repository doesn't exist on GitHub - create it first
    echo 2. Authentication failed - check your credentials
    echo 3. Wrong username/repository name
    echo.
    echo Please create the repository on GitHub first:
    echo https://github.com/new
)

echo.
pause
