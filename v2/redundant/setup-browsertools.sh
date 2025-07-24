#!/bin/bash

clear
echo ""
echo "================================================"
echo "   🔧 BATTEL - Enhanced BrowserTools Setup"
echo "   Professional Development Environment"
echo "================================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}[INFO]${NC} Starting enhanced BrowserTools setup..."
echo ""

# Check prerequisites
echo -e "${BLUE}[1/8]${NC} Checking prerequisites..."
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js not found${NC}"
    echo "Please install Node.js ≥18.0.0 from https://nodejs.org/"
    exit 1
fi

# Check npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm not found${NC}"
    echo "Please install npm ≥8.0.0"
    exit 1
fi

# Check Chrome/Chromium
if command -v google-chrome &> /dev/null || command -v chromium-browser &> /dev/null || command -v open &> /dev/null; then
    echo -e "${GREEN}✅ Browser found${NC}"
else
    echo -e "${YELLOW}⚠️  Chrome not found in PATH${NC}"
    echo "Chrome will need to be opened manually"
fi

echo -e "${GREEN}✅ Prerequisites verified${NC}"
echo ""

# Install global dependencies
echo -e "${BLUE}[2/8]${NC} Installing global dependencies..."
echo ""

echo "Installing BrowserTools globally..."
npm install -g @agentdeskai/browser-tools-mcp@latest
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to install BrowserTools MCP${NC}"
    exit 1
fi

npm install -g @agentdeskai/browser-tools-server@latest
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to install BrowserTools Server${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Global dependencies installed${NC}"
echo ""

# Create development directories
echo -e "${BLUE}[3/8]${NC} Setting up development directories..."
echo ""

mkdir -p screenshots
mkdir -p logs
mkdir -p .browsertools

echo -e "${GREEN}✅ Development directories created${NC}"
echo ""

# Create advanced configuration
echo -e "${BLUE}[4/8]${NC} Creating advanced configuration..."
echo ""

# Create BrowserTools config
cat > .browsertools/config.json << 'EOF'
{
  "version": "2.0.0",
  "debug": true,
  "autoScreenshot": true,
  "screenshotPath": "./screenshots",
  "logLevel": "verbose",
  "performance": {
    "monitor": true,
    "interval": 5000,
    "vitals": true
  },
  "integration": {
    "cursor": true,
    "devtools": true,
    "console": true
  }
}
EOF

echo -e "${GREEN}✅ Configuration files created${NC}"
echo ""

# Create development server script
echo -e "${BLUE}[5/8]${NC} Creating development server script..."
echo ""

# Create start script for Mac/Linux
cat > start-dev-server.sh << 'EOF'
#!/bin/bash

echo ""
echo "========================================"
echo "   🚀 BATTEL Development Server"
echo "========================================"
echo ""

echo "[1/3] Starting local server..."
python3 -m http.server 8080 --directory . &
SERVER_PID=$!
sleep 2

echo "[2/3] Starting BrowserTools server..."
npx @agentdeskai/browser-tools-server@latest &
BROWSERTOOLS_PID=$!
sleep 3

echo "[3/3] Opening Chrome with DevTools..."
if command -v open &> /dev/null; then
    # macOS
    open -a "Google Chrome" --args --new-window --auto-open-devtools-for-tabs http://localhost:8080
elif command -v google-chrome &> /dev/null; then
    # Linux with Google Chrome
    google-chrome --new-window --auto-open-devtools-for-tabs http://localhost:8080 &
elif command -v chromium-browser &> /dev/null; then
    # Linux with Chromium
    chromium-browser --new-window --auto-open-devtools-for-tabs http://localhost:8080 &
else
    echo "Please open Chrome manually and navigate to http://localhost:8080"
fi

echo ""
echo "✅ Development environment ready!"
echo ""
echo "🌐 Website: http://localhost:8080"
echo "🔧 BrowserTools: Port 3025"
echo "📸 Screenshots: ./screenshots/"
echo ""
echo "Press Ctrl+C to stop all servers"

# Wait for Ctrl+C
trap 'kill $SERVER_PID $BROWSERTOOLS_PID 2>/dev/null; exit' INT
wait
EOF

chmod +x start-dev-server.sh

echo -e "${GREEN}✅ Development server script created${NC}"
echo ""

# Create Cursor MCP configuration helper
echo -e "${BLUE}[6/8]${NC} Creating Cursor MCP configuration..."
echo ""

cat > cursor-mcp-config.json << 'EOF'
{
  "name": "browser-tools",
  "type": "command",
  "command": "npx @agentdeskai/browser-tools-mcp@latest",
  "args": [],
  "env": {
    "BROWSERTOOLS_DEBUG": "true",
    "BROWSERTOOLS_CONFIG_PATH": "./v2/.browsertools/config.json"
  }
}
EOF

echo -e "${GREEN}✅ Cursor MCP configuration created${NC}"
echo ""

# Create debugging helpers
echo -e "${BLUE}[7/8]${NC} Creating debugging helpers..."
echo ""

# Create debug info script
cat > debug-info.sh << 'EOF'
#!/bin/bash

echo ""
echo "========================================"
echo "   🔍 BATTEL Debug Information"
echo "========================================"
echo ""

echo "Node.js Version:"
node --version

echo "npm Version:"
npm --version

echo ""
echo "BrowserTools MCP:"
npx @agentdeskai/browser-tools-mcp@latest --version 2>/dev/null || echo "Not installed"

echo "BrowserTools Server:"
npx @agentdeskai/browser-tools-server@latest --version 2>/dev/null || echo "Not installed"

echo ""
echo "Current Directory:"
pwd

echo ""
echo "Git Repository:"
git remote -v 2>/dev/null || echo "Not a git repository"

echo ""
echo "Network Status:"
ping -c 1 8.8.8.8 >/dev/null 2>&1 && echo "✅ Internet connected" || echo "❌ No internet connection"

echo ""
read -p "Press Enter to continue..."
EOF

chmod +x debug-info.sh

# Create performance test script
cat > test-performance.sh << 'EOF'
#!/bin/bash

echo ""
echo "========================================"
echo "   ⚡ BATTEL Performance Test"
echo "========================================"
echo ""

echo "Testing local server startup..."
python3 -m http.server 8081 --directory . >/dev/null 2>&1 &
TEST_PID=$!
sleep 5

echo "Testing page load speed..."
if command -v curl &> /dev/null; then
    curl -o /dev/null -s -w "Time: %{time_total}s\n" http://localhost:8081
else
    echo "curl not available for testing"
fi

echo "Testing BrowserTools connection..."
curl -o /dev/null -s -w "BrowserTools Response: %{http_code}\n" http://localhost:3025/health 2>/dev/null || echo "BrowserTools not running"

echo ""
echo "Performance test completed!"
kill $TEST_PID 2>/dev/null

echo ""
read -p "Press Enter to continue..."
EOF

chmod +x test-performance.sh

echo -e "${GREEN}✅ Debugging helpers created${NC}"
echo ""

# Final setup and instructions
echo -e "${BLUE}[8/8]${NC} Finalizing setup..."
echo ""

# Create startup instruction file
cat > SETUP_COMPLETE.txt << 'EOF'
================================================
  🎉 BATTEL BrowserTools Setup Complete!
================================================

QUICK START:
1. Run: ./start-dev-server.sh
2. Install Chrome Extension:
   https://browsertools.agentdesk.ai/installation
3. Configure Cursor MCP:
   Copy content from cursor-mcp-config.json
4. Open DevTools → BrowserTools tab

ADVANCED FEATURES:
• Auto-screenshots in ./screenshots/
• Performance monitoring enabled
• Debug logging in ./logs/
• Hot-reload development server

DEBUGGING:
• Run: ./debug-info.sh for system info
• Run: ./test-performance.sh for speed tests

URLS:
• Website: http://localhost:8080
• BrowserTools: http://localhost:3025

CURSOR MCP SETUP:
1. Cursor → Settings → MCP Servers
2. Add new server with config from cursor-mcp-config.json
3. Restart Cursor
4. Test: Ask AI "take a screenshot"
================================================
EOF

echo -e "${GREEN}✅ Setup completed successfully!${NC}"
echo ""
echo -e "${YELLOW}📋 Next Steps:${NC}"
echo -e "1. 🌐 Run: ${GREEN}./start-dev-server.sh${NC}"
echo -e "2. 🔧 Install Chrome Extension: ${BLUE}https://browsertools.agentdesk.ai/installation${NC}"
echo -e "3. ⚙️  Configure Cursor MCP (see cursor-mcp-config.json)"
echo -e "4. 🧪 Test: Ask AI to \"take a screenshot\""
echo ""
echo -e "${BLUE}📄 Full instructions: SETUP_COMPLETE.txt${NC}"
echo ""

# Ask if user wants to start dev environment now
echo -e "${YELLOW}Would you like to start the development environment now? (y/n)${NC}"
read -p "Enter choice: " choice

if [[ "$choice" =~ ^[Yy]$ ]]; then
    echo ""
    echo -e "${GREEN}🚀 Starting development environment...${NC}"
    ./start-dev-server.sh
else
    echo ""
    echo -e "${BLUE}You can start the development environment later with:${NC}"
    echo -e "${GREEN}./start-dev-server.sh${NC}"
fi

echo ""
echo -e "${GREEN}🎉 Enhanced BrowserTools setup complete!${NC}"
echo "" 