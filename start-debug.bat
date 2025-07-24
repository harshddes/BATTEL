@echo off
echo.
echo ====================================
echo   BrowserTools Debug Environment
echo ====================================
echo.

echo [1/4] Starting Backend Server...
start "Backend Server" cmd /k "npm start"
timeout /t 3 /nobreak >nul

echo [2/4] Starting BrowserTools MCP Server...
start "BrowserTools Server" cmd /k "npx @agentdeskai/browser-tools-server@1.2.0"
timeout /t 3 /nobreak >nul

echo [3/4] Opening Chrome with DevTools...
start "Chrome Browser" chrome --new-window --auto-open-devtools-for-tabs http://localhost:3000/index.html
timeout /t 2 /nobreak >nul

echo [4/4] Environment Ready!
echo.
echo ========================================
echo   SETUP CHECKLIST - Do These Steps:
echo ========================================
echo.
echo 1. Chrome Extension: Install from https://browsertools.agentdesk.ai/installation
echo 2. Cursor MCP: Settings → MCP Servers → Add "browser-tools"
echo 3. DevTools: Press F12 → Find "BrowserTools" tab
echo 4. Test: Ask AI to "take a screenshot" in Cursor
echo.
echo ✅ Backend: http://localhost:3000/health
echo ✅ Frontend: http://localhost:3000/index.html  
echo ✅ BrowserTools: Port 3025
echo.
echo Press any key to open setup instructions...
pause >nul
start BROWSERTOOLS_COMPLETE_SETUP.md 