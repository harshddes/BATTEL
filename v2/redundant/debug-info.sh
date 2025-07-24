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
