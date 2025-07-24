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
