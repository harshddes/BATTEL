# TestBed Zero - Quick Start Guide

## 🚀 What You've Built

A **Zero-Knowledge Testing Platform** where:
- ✅ All data is encrypted client-side (AES-256-GCM)
- ✅ Server never sees your passwords or data
- ✅ Modern Web Crypto API implementation
- ✅ In-memory demo (no database required)
- ✅ Professional frontend interface

## 📋 Prerequisites

You need:
- **Node.js** (version 16+) - [Download here](https://nodejs.org/)
- **Web browser** (Chrome, Firefox, Safari, Edge)
- **Terminal/Command Prompt**

## 🏃‍♂️ Running the Project

### Option 1: Automated Scripts (Easiest)

**Windows:**
```bash
# Double-click run.bat or run in terminal:
run.bat
```

**Mac/Linux:**
```bash
# Run in terminal:
./run.sh
```

### Option 2: Manual Commands

**Step 1: Install Dependencies**
```bash
npm install
```

**Step 2: Build the Project**
```bash
npm run build
```

**Step 3: Start Backend**
```bash
# Windows
set JWT_SECRET=demo-secret-key && set PORT=3000 && node dist/app.js

# Mac/Linux  
export JWT_SECRET=demo-secret-key && export PORT=3000 && node dist/app.js
```

**Step 4: Open Frontend**
- Open `index.html` in your web browser
- Or go to http://localhost:3000 if you set up static serving

## 🧪 Testing the Zero-Knowledge Features

1. **Open** `index.html` in your browser
2. **Register** a new account:
   - Watch the console - encryption keys are generated locally
   - Your password never leaves your browser
3. **Create a project**:
   - Each project gets its own encryption key
   - All metadata is encrypted before sending to server
4. **Upload files**:
   - Files are encrypted in 1MB chunks in your browser
   - Server only receives encrypted data
5. **Check backend logs**:
   - You'll see "Demo: User registered" messages
   - But no actual user data (it's all encrypted!)

## 🔍 What's Happening Under the Hood

### Client-Side (Browser)
- Password → PBKDF2 → Master Key (100,000 iterations)
- Master Key encrypts user's private key
- Each project gets unique AES-256 key
- Files encrypted in chunks before upload
- **Zero plaintext data leaves the browser**

### Server-Side (Backend)
- Only receives encrypted data
- Cannot decrypt anything
- Stores encrypted blobs
- Provides API endpoints for CRUD operations
- **Zero access to your actual data**

## 🛠️ Development Commands

```bash
# Build TypeScript
npm run build

# Start in development mode
npm run dev

# Run tests
npm test

# Clean build
npm run clean
```

## 📁 Project Structure

```
BATTEL/
├── index.html         # Frontend interface
├── app.js            # Frontend app logic
├── crypto.js         # Client-side encryption
├── dist/             # Built backend
├── src/              # TypeScript source
├── run.bat          # Windows launcher
├── run.sh           # Unix launcher
└── package.json     # Dependencies
```

## 🔧 Troubleshooting

**"node: command not found"**
- Install Node.js from nodejs.org

**"Cannot find module"**
- Run `npm install` first

**Backend won't start**
- Check if port 3000 is available
- Change PORT in the scripts if needed

**Frontend shows errors**
- Make sure backend is running first
- Check browser console for details

## 🌐 Accessing the Demo

- **Backend API**: http://localhost:3000
- **Health Check**: http://localhost:3000/health  
- **Frontend**: Open `index.html` in browser

## ✨ Key Features Demonstrated

1. **Registration**: Password-derived encryption keys
2. **Login**: Zero-knowledge authentication  
3. **Projects**: Per-project encryption keys
4. **Files**: Chunked file encryption
5. **Security**: No plaintext data on server

## 🔒 Security Note

This is a **DEMO** implementation. For production:
- Use stronger JWT secrets
- Enable HTTPS
- Add rate limiting
- Use persistent database
- Implement proper key exchange for sharing

---

**🎉 Enjoy your Zero-Knowledge Testing Platform!** 