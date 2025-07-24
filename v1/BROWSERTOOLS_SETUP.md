# 🔍 BrowserTools MCP Setup Guide for Cursor

This guide will enable me (the AI) to see your browser in real-time, debug console errors, and help you more effectively!

## 📋 **Prerequisites**
- Cursor IDE installed
- Chrome/Chromium browser
- Node.js (already have this)

## 🚀 **Step-by-Step Setup**

### **Step 1: Install Chrome Extension**

1. **Download** the BrowserTools extension:
   - Visit: https://browsertools.agentdesk.ai/installation
   - Download the extension zip file
   - **OR** search Chrome Web Store for "AgentDesk BrowserTools"

2. **Install in Chrome**:
   - Open Chrome → **Settings** → **Extensions** (chrome://extensions/)
   - Enable **Developer mode** (top right toggle)
   - Click **Load unpacked** 
   - Select the downloaded zip file
   - **Enable** the extension when it appears

### **Step 2: Start the MCP Server**

Open a **new terminal** (separate from where your backend is running):

```bash
npx @agentdeskai/browser-tools-server@latest
```

**Keep this terminal running!** You should see:
```
BrowserTools MCP Server starting on port 3845...
Server ready for connections
```

### **Step 3: Configure Cursor MCP**

1. **Open Cursor** → **Settings** (Ctrl+,)
2. Search for **"MCP"** or go to **Settings** → **MCP Servers**
3. Click **"Install New MCP Server"**
4. **Add this configuration**:

```json
{
  "mcpServers": {
    "browser-tools": {
      "command": "npx",
      "args": ["-y", "@agentdeskai/browser-tools-mcp@1.2.0"]
    }
  }
}
```

5. **Save** and **restart Cursor**

### **Step 4: Verify Integration**

1. **Restart Cursor** completely
2. Open a **new chat** in Cursor
3. Ask: *"Can you see my browser console logs?"*
4. I should respond with details about browser tools availability

### **Step 5: Test Real-Time Debugging**

1. **Open** your project: http://localhost:3000/index.html
2. **Try to register** and cause the error
3. **Ask me**: *"What console errors do you see?"*
4. I should be able to see the actual browser console errors!

## 🎯 **What This Enables**

Once set up, I can:
- ✅ **See console errors** in real-time
- ✅ **Monitor network requests** (like your fetch failures)
- ✅ **Debug JavaScript errors** as they happen
- ✅ **Inspect DOM elements** if needed
- ✅ **Help fix issues** without you copy-pasting errors

## 🔧 **Troubleshooting MCP Setup**

**"MCP Server not found"**
```bash
# Make sure the server is running first:
npx @agentdeskai/browser-tools-server@latest
```

**"Extension not working"**
- Check Chrome extensions are enabled
- Make sure you're on the tab with your project
- Refresh the page after installing extension

**"Cursor doesn't see MCP"**
- Restart Cursor completely
- Check MCP settings shows "browser-tools" as connected
- Try reloading the MCP server in settings

## 📱 **Alternative: Manual Console Monitoring**

If MCP setup fails, you can still help me debug:

1. **Open DevTools** (F12)
2. **Keep Console tab open**
3. **Copy errors** and paste them to me
4. **Tell me what you're doing** when errors occur

---

## ✅ **Success Indicators**

You'll know it's working when:
- ✅ Chrome extension shows "Connected" 
- ✅ MCP server terminal shows connection messages
- ✅ Cursor MCP settings shows "browser-tools" as active
- ✅ I can answer "What console errors do you see?" with actual errors

**Once set up, I'll be your real-time browser debugging assistant!** 🎉 