# 🔍 **Complete BrowserTools MCP Setup for Cursor**


## 🎯 **What This Enables**
- ✅ **Real-time website preview** in Cursor
- ✅ **Automatic console error capture**  
- ✅ **Network request monitoring**
- ✅ **Screenshot capabilities**
- ✅ **DOM element inspection**
- ✅ **No manual error copy-pasting**

## 📋 **Prerequisites**
- Cursor IDE installed
- Google Chrome browser
- Node.js (✅ already have)

---

## 🚀 **STEP 1: Install Chrome Extension**

### **Method A: Direct Download**
1. Visit: https://browsertools.agentdesk.ai/installation
2. Click **"Download the Chrome Extension"**
3. Save the `.zip` file to your desktop

### **Method B: Clone Repository**
```bash
git clone https://github.com/AgentDeskAI/browser-tools-mcp.git
cd browser-tools-mcp/chrome-extension
```

### **Install Extension in Chrome:**
1. Open Chrome → **More tools** → **Extensions**
   - OR navigate to: `chrome://extensions/`
2. Enable **"Developer mode"** (top right toggle)
3. Click **"Load unpacked"**
4. Select the downloaded/cloned chrome-extension folder
5. **Enable** the extension when it appears
6. You should see **"BrowserToolsMCP"** in your extensions list

---

## 🚀 **STEP 2: Setup MCP Server in Cursor**

### **Open Cursor Settings:**
1. **Cursor** → **Settings** (or `Ctrl+,`)
2. Search for **"MCP"** in settings
3. Click **"Features"** → Scroll to **"MCP Servers"**
4. Click **"Add new MCP server"**

### **Configure MCP Server:**
- **Name**: `browser-tools`
- **Type**: `command`
- **Command**: 
  ```bash
  npx @agentdeskai/browser-tools-mcp@1.2.0
  ```

### **For Windows NPX Path (if needed):**
```powershell
# Find NPX path
which npx
# OR
Get-Command npx
```

### **Save and Verify:**
- Click **"Save"**
- Wait for green circle next to **"browser-tools"**
- You should see tools like:
  - `take_screenshot`
  - `get_console_logs`
  - `get_network_logs`
  - `get_selected_element`

---

## 🚀 **STEP 3: Start Browser Tools Server**

This server connects the Chrome extension to the MCP system:

```bash
npx @agentdeskai/browser-tools-server@1.2.0
```

**Important Notes:**
- Server runs on port **3025**
- Keep this terminal open while using BrowserTools
- You'll see connection logs when Chrome extension connects

---

## 🚀 **STEP 4: Setup Browser for Debugging**

### **Open Your Website:**
1. Navigate to: `http://localhost:3000/index.html`
2. **Right-click** → **"Inspect"** (opens Chrome DevTools)
3. Navigate to **"BrowserTools"** panel in DevTools

### **Configure BrowserTools Panel:**
- **Screenshot Path**: Set to your project folder (e.g., `Z:\SPRL\BATTEL\screenshots`)
- **Log Settings**: Adjust as needed
- **Manual Controls**: Test screenshot capture

---

## 🔧 **STEP 5: Test Integration**

### **Verify Everything Works:**
1. **Backend Running**: `http://localhost:3000/health`
2. **Frontend Loading**: `http://localhost:3000/index.html`
3. **Chrome Extension**: Shows green status
4. **BrowserTools Server**: Running on port 3025
5. **MCP in Cursor**: Green circle, tools visible

### **Test Commands in Cursor:**
- Ask AI: *"Take a screenshot of the current page"*
- Ask AI: *"Check console logs for errors"*
- Ask AI: *"Monitor network requests"*

---

## 🎯 **System-Wide Configuration**

### **Make MCP Available Globally:**
The MCP server configuration in Cursor applies **system-wide** to all projects. Once configured, BrowserTools will work in any Cursor workspace.

### **Auto-Start Scripts:**
Create shortcuts for quick setup:

**Windows Batch (`start-debug.bat`):**
```batch
@echo off
echo Starting BrowserTools Debug Environment...
start "BrowserTools Server" cmd /k "npx @agentdeskai/browser-tools-server@1.2.0"
start "Backend Server" cmd /k "npm start"
start "Browser" chrome http://localhost:3000/index.html
echo Debug environment started!
pause
```

---

## ⚡ **Quick Start Commands**

Once everything is set up, use these commands:

1. **Start Backend**: `npm start`
2. **Start BrowserTools**: `npx @agentdeskai/browser-tools-server@1.2.0`
3. **Open Browser**: `http://localhost:3000/index.html`
4. **Open DevTools**: `F12` → **BrowserTools** tab

---

## 🔍 **Troubleshooting**

### **Common Issues:**

**MCP Not Connecting:**
- Restart Cursor
- Check NPX path is correct
- Verify internet connection for package download

**Browser Extension Not Working:**
- Refresh extension page
- Check if extension is enabled
- Try incognito mode

**Server Connection Issues:**
- Check port 3025 is free: `netstat -an | findstr :3025`
- Restart BrowserTools server
- Check firewall settings

**No Screenshots:**
- Set screenshot path in BrowserTools panel
- Check folder permissions
- Try manual screenshot first

---

## 🎉 **You're Ready!**

Once setup is complete, I'll be able to:
- 👀 **See your website** in real-time
- 🐛 **Debug errors** automatically
- 📷 **Take screenshots** 
- 🌐 **Monitor network** requests
- 🔍 **Inspect elements**

No more manual error copy-pasting! Just describe the issue and I'll investigate directly. 