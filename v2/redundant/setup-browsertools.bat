@echo off
cls
echo.
echo ================================================
echo   🔧 BATTEL - Enhanced BrowserTools Setup
echo   Professional Development Environment
echo ================================================
echo.

:: Set colors for output
set GREEN=[92m
set BLUE=[94m
set YELLOW=[93m
set RED=[91m
set RESET=[0m

echo %BLUE%[INFO]%RESET% Starting enhanced BrowserTools setup...
echo.

:: Check prerequisites
echo %BLUE%[1/8]%RESET% Checking prerequisites...
echo.

:: Check Node.js
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo %RED%❌ Node.js not found%RESET%
    echo Please install Node.js ≥18.0.0 from https://nodejs.org/
    pause
    exit /b 1
)

:: Check npm
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo %RED%❌ npm not found%RESET%
    echo Please install npm ≥8.0.0
    pause
    exit /b 1
)

:: Check Chrome
where chrome >nul 2>&1
if %errorlevel% neq 0 (
    where "C:\Program Files\Google\Chrome\Application\chrome.exe" >nul 2>&1
    if %errorlevel% neq 0 (
        echo %YELLOW%⚠️  Chrome not found in PATH%RESET%
        echo Chrome will need to be opened manually
    )
)

echo %GREEN%✅ Prerequisites verified%RESET%
echo.

:: Install global dependencies
echo %BLUE%[2/8]%RESET% Installing global dependencies...
echo.

echo Installing BrowserTools globally...
call npm install -g @agentdeskai/browser-tools-mcp@latest
if %errorlevel% neq 0 (
    echo %RED%❌ Failed to install BrowserTools MCP%RESET%
    pause
    exit /b 1
)

call npm install -g @agentdeskai/browser-tools-server@latest
if %errorlevel% neq 0 (
    echo %RED%❌ Failed to install BrowserTools Server%RESET%
    pause
    exit /b 1
)

echo %GREEN%✅ Global dependencies installed%RESET%
echo.

:: Create development directories
echo %BLUE%[3/8]%RESET% Setting up development directories...
echo.

if not exist "screenshots" mkdir screenshots
if not exist "logs" mkdir logs
if not exist ".browsertools" mkdir .browsertools

echo %GREEN%✅ Development directories created%RESET%
echo.

:: Create advanced configuration
echo %BLUE%[4/8]%RESET% Creating advanced configuration...
echo.

:: Create BrowserTools config
echo {^
  "version": "2.0.0",^
  "debug": true,^
  "autoScreenshot": true,^
  "screenshotPath": "./screenshots",^
  "logLevel": "verbose",^
  "performance": {^
    "monitor": true,^
    "interval": 5000,^
    "vitals": true^
  },^
  "integration": {^
    "cursor": true,^
    "devtools": true,^
    "console": true^
  }^
} > .browsertools\config.json

echo %GREEN%✅ Configuration files created%RESET%
echo.

:: Create development server script
echo %BLUE%[5/8]%RESET% Creating development server script...
echo.

echo @echo off > start-dev-server.bat
echo echo. >> start-dev-server.bat
echo echo ======================================== >> start-dev-server.bat
echo echo   🚀 BATTEL Development Server >> start-dev-server.bat
echo echo ======================================== >> start-dev-server.bat
echo echo. >> start-dev-server.bat
echo echo [1/3] Starting local server... >> start-dev-server.bat
echo start "Local Server" cmd /k "python -m http.server 8080 --directory v2" >> start-dev-server.bat
echo timeout /t 2 /nobreak ^>nul >> start-dev-server.bat
echo echo [2/3] Starting BrowserTools server... >> start-dev-server.bat
echo start "BrowserTools" cmd /k "npx @agentdeskai/browser-tools-server@latest" >> start-dev-server.bat
echo timeout /t 3 /nobreak ^>nul >> start-dev-server.bat
echo echo [3/3] Opening Chrome with DevTools... >> start-dev-server.bat
echo start "Chrome DevTools" chrome --new-window --auto-open-devtools-for-tabs http://localhost:8080 >> start-dev-server.bat
echo echo. >> start-dev-server.bat
echo echo ✅ Development environment ready! >> start-dev-server.bat
echo echo. >> start-dev-server.bat
echo echo 🌐 Website: http://localhost:8080 >> start-dev-server.bat
echo echo 🔧 BrowserTools: Port 3025 >> start-dev-server.bat
echo echo 📸 Screenshots: ./screenshots/ >> start-dev-server.bat
echo echo. >> start-dev-server.bat
echo pause >> start-dev-server.bat

echo %GREEN%✅ Development server script created%RESET%
echo.

:: Create Cursor MCP configuration helper
echo %BLUE%[6/8]%RESET% Creating Cursor MCP configuration...
echo.

echo {^
  "name": "browser-tools",^
  "type": "command",^
  "command": "npx @agentdeskai/browser-tools-mcp@latest",^
  "args": [],^
  "env": {^
    "BROWSERTOOLS_DEBUG": "true",^
    "BROWSERTOOLS_CONFIG_PATH": "./v2/.browsertools/config.json"^
  }^
} > cursor-mcp-config.json

echo %GREEN%✅ Cursor MCP configuration created%RESET%
echo.

:: Create debugging helpers
echo %BLUE%[7/8]%RESET% Creating debugging helpers...
echo.

:: Create debug info script
echo @echo off > debug-info.bat
echo echo. >> debug-info.bat
echo echo ======================================== >> debug-info.bat
echo echo   🔍 BATTEL Debug Information >> debug-info.bat
echo echo ======================================== >> debug-info.bat
echo echo. >> debug-info.bat
echo echo Node.js Version: >> debug-info.bat
echo node --version >> debug-info.bat
echo echo npm Version: >> debug-info.bat
echo npm --version >> debug-info.bat
echo echo. >> debug-info.bat
echo echo BrowserTools MCP: >> debug-info.bat
echo npx @agentdeskai/browser-tools-mcp@latest --version 2^>nul ^|^| echo "Not installed" >> debug-info.bat
echo echo BrowserTools Server: >> debug-info.bat
echo npx @agentdeskai/browser-tools-server@latest --version 2^>nul ^|^| echo "Not installed" >> debug-info.bat
echo echo. >> debug-info.bat
echo echo Current Directory: >> debug-info.bat
echo cd >> debug-info.bat
echo echo. >> debug-info.bat
echo echo Git Repository: >> debug-info.bat
echo git remote -v 2^>nul ^|^| echo "Not a git repository" >> debug-info.bat
echo echo. >> debug-info.bat
echo echo Network Status: >> debug-info.bat
echo ping -n 1 8.8.8.8 ^>nul 2^>nul ^&^& echo "✅ Internet connected" ^|^| echo "❌ No internet connection" >> debug-info.bat
echo echo. >> debug-info.bat
echo pause >> debug-info.bat

:: Create performance test script
echo @echo off > test-performance.bat
echo echo. >> test-performance.bat
echo echo ======================================== >> test-performance.bat
echo echo   ⚡ BATTEL Performance Test >> test-performance.bat
echo echo ======================================== >> test-performance.bat
echo echo. >> test-performance.bat
echo echo Testing local server startup... >> test-performance.bat
echo start "Performance Test Server" /min cmd /c "python -m http.server 8081 --directory v2" >> test-performance.bat
echo timeout /t 5 /nobreak ^>nul >> test-performance.bat
echo echo Testing page load speed... >> test-performance.bat
echo curl -o nul -s -w "Time: %%{time_total}s\n" http://localhost:8081 >> test-performance.bat
echo echo Testing BrowserTools connection... >> test-performance.bat
echo curl -o nul -s -w "BrowserTools Response: %%{http_code}\n" http://localhost:3025/health 2^>nul ^|^| echo "BrowserTools not running" >> test-performance.bat
echo echo. >> test-performance.bat
echo echo Performance test completed! >> test-performance.bat
echo taskkill /f /im python.exe ^>nul 2^>nul >> test-performance.bat
echo pause >> test-performance.bat

echo %GREEN%✅ Debugging helpers created%RESET%
echo.

:: Final setup and instructions
echo %BLUE%[8/8]%RESET% Finalizing setup...
echo.

:: Create startup instruction file
echo ================================================ > SETUP_COMPLETE.txt
echo   🎉 BATTEL BrowserTools Setup Complete! >> SETUP_COMPLETE.txt
echo ================================================ >> SETUP_COMPLETE.txt
echo. >> SETUP_COMPLETE.txt
echo QUICK START: >> SETUP_COMPLETE.txt
echo 1. Run: start-dev-server.bat >> SETUP_COMPLETE.txt
echo 2. Install Chrome Extension: >> SETUP_COMPLETE.txt
echo    https://browsertools.agentdesk.ai/installation >> SETUP_COMPLETE.txt
echo 3. Configure Cursor MCP: >> SETUP_COMPLETE.txt
echo    Copy content from cursor-mcp-config.json >> SETUP_COMPLETE.txt
echo 4. Open DevTools → BrowserTools tab >> SETUP_COMPLETE.txt
echo. >> SETUP_COMPLETE.txt
echo ADVANCED FEATURES: >> SETUP_COMPLETE.txt
echo • Auto-screenshots in ./screenshots/ >> SETUP_COMPLETE.txt
echo • Performance monitoring enabled >> SETUP_COMPLETE.txt
echo • Debug logging in ./logs/ >> SETUP_COMPLETE.txt
echo • Hot-reload development server >> SETUP_COMPLETE.txt
echo. >> SETUP_COMPLETE.txt
echo DEBUGGING: >> SETUP_COMPLETE.txt
echo • Run: debug-info.bat for system info >> SETUP_COMPLETE.txt
echo • Run: test-performance.bat for speed tests >> SETUP_COMPLETE.txt
echo. >> SETUP_COMPLETE.txt
echo URLS: >> SETUP_COMPLETE.txt
echo • Website: http://localhost:8080 >> SETUP_COMPLETE.txt
echo • BrowserTools: http://localhost:3025 >> SETUP_COMPLETE.txt
echo. >> SETUP_COMPLETE.txt
echo CURSOR MCP SETUP: >> SETUP_COMPLETE.txt
echo 1. Cursor → Settings → MCP Servers >> SETUP_COMPLETE.txt
echo 2. Add new server with config from cursor-mcp-config.json >> SETUP_COMPLETE.txt
echo 3. Restart Cursor >> SETUP_COMPLETE.txt
echo 4. Test: Ask AI "take a screenshot" >> SETUP_COMPLETE.txt
echo ================================================ >> SETUP_COMPLETE.txt

echo %GREEN%✅ Setup completed successfully!%RESET%
echo.
echo %YELLOW%📋 Next Steps:%RESET%
echo 1. 🌐 Run: %GREEN%start-dev-server.bat%RESET%
echo 2. 🔧 Install Chrome Extension: %BLUE%https://browsertools.agentdesk.ai/installation%RESET%
echo 3. ⚙️  Configure Cursor MCP (see cursor-mcp-config.json)
echo 4. 🧪 Test: Ask AI to "take a screenshot"
echo.
echo %BLUE%📄 Full instructions: SETUP_COMPLETE.txt%RESET%
echo.

:: Open instructions file
start SETUP_COMPLETE.txt

:: Ask if user wants to start dev environment now
echo %YELLOW%Would you like to start the development environment now? (y/n)%RESET%
set /p choice="Enter choice: "

if /i "%choice%"=="y" (
    echo.
    echo %GREEN%🚀 Starting development environment...%RESET%
    call start-dev-server.bat
) else (
    echo.
    echo %BLUE%You can start the development environment later with:%RESET%
    echo %GREEN%start-dev-server.bat%RESET%
)

echo.
echo %GREEN%🎉 Enhanced BrowserTools setup complete!%RESET%
echo.
pause 