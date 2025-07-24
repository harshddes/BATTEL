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
