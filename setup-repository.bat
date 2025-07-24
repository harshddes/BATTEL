@echo off
echo.
echo ============================================
echo   BATTEL - GitHub Repository Setup
echo ============================================
echo.

echo [1/6] Removing existing node_modules (will be regenerated)...
if exist "node_modules" (
    rmdir /s /q "node_modules"
    echo ✅ Root node_modules removed
) else (
    echo ✅ No root node_modules found
)

if exist "v1\node_modules" (
    rmdir /s /q "v1\node_modules" 
    echo ✅ v1/node_modules removed
) else (
    echo ✅ No v1/node_modules found
)

echo.
echo [2/6] Initializing Git repository...
git init
git add .gitignore
git commit -m "feat: add comprehensive .gitignore for Node.js/TypeScript project"

echo.
echo [3/6] Adding project files...
git add README.md LICENSE CONTRIBUTING.md GITHUB_SETUP_COMPLETE.md
git add v1/package.json v1/package-lock.json
git add v1/src/ v1/tsconfig.json v1/jest.config.ts
git add v1/*.js v1/*.html v1/*.md
git add testbedzv2/ v2/
git add BROWSERTOOLS_COMPLETE_SETUP.md start-debug.bat
git add .github/
git add setup-repository.bat setup-repository.sh
git commit -m "feat: add BATTEL secure testing platform core files

- Zero-knowledge authentication system
- Privacy-preserving AI/ML capabilities  
- TypeScript/Node.js backend architecture
- Comprehensive testing framework
- BrowserTools integration for debugging
- Professional GitHub repository structure
- CI/CD workflows and issue templates
- Comprehensive contribution guidelines"

echo.
echo [4/6] Checking prerequisites...
echo Verifying Node.js installation...
node --version 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js not found. Please install Node.js ≥18.0.0
    echo Download from: https://nodejs.org/
    pause
    exit /b 1
)

echo Verifying npm installation...
npm --version 2>nul
if %errorlevel% neq 0 (
    echo ❌ npm not found. Please install npm ≥8.0.0
    pause
    exit /b 1
)

echo ✅ Prerequisites verified

echo.
echo [5/6] Installing dependencies...
cd v1
echo Installing v1/ dependencies...
npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)
cd ..

echo.
echo [6/6] Repository setup complete!
echo.
echo ========================================
echo   NEXT STEPS:
echo ========================================
echo.
echo 1. Create GitHub repository:
echo    • Go to https://github.com/new
echo    • Repository name: BATTEL
echo    • Description: "Secure Zero-Knowledge Testing Platform"
echo    • Set to Public/Private as needed
echo    • DO NOT initialize with README/gitignore
echo.
echo 2. Connect to GitHub:
echo    git remote add origin https://github.com/YOUR-USERNAME/BATTEL.git
echo    git branch -M main
echo    git push -u origin main
echo.
echo 3. Verify setup:
echo    cd v1
echo    npm run build
echo    npm start
echo.
echo ✅ Ready for GitHub! Project is professional-grade.
echo.
pause 