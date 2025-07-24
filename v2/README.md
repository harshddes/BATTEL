# V2 - Production Website

## Quick Start

```bash
# Start development environment with BrowserTools MCP integration
./start-dev-server.sh

# View locally with real-time monitoring
open http://localhost:8080
```

## Complete Technical Architecture

### **GitHub Pages Production Setup**
- **Live Domain**: `https://harshddes.github.io/BATTEL/`
- **Source Directory**: `v2/` (all website source code)
- **Entry Point**: `v2/index.html` (CRITICAL - GitHub Pages requirement)
- **Jekyll Bypass**: `v2/.nojekyll` (prevents GitHub Jekyll processing)
- **Deployment Branch**: `main` branch triggers automatic deployment
- **Deployment Duration**: ~2-3 minutes from commit to live

### **GitHub Actions Workflow Pipeline**
```yaml
# File: .github/workflows/deploy-pages.yml
# Triggers: Push to main branch affecting v2/** files
# Process: v2/ → _site/ → GitHub Pages artifact → Live deployment
```

**Automated Deployment Steps:**
1. Checkout repository from main branch
2. Setup GitHub Pages environment with proper permissions
3. Copy `v2/*` files to `_site/` directory
4. Create `.nojekyll` file in deployment artifact
5. Upload Pages artifact with correct structure
6. Deploy to `https://harshddes.github.io/BATTEL/`

## Development Environment Technical Specs

### **Localhost Development Server**
- **Port**: `8080` (Python HTTP server)
- **Command**: `python3 -m http.server 8080 --directory v2`
- **Quick Start Script**: `./start-dev-server.sh`
- **Local URL**: `http://localhost:8080`
- **File Watching**: Instant refresh on file changes

### **BrowserTools MCP Integration (MANDATORY)**
- **Server Port**: `3025` (BrowserTools MCP server)
- **Configuration File**: `v2/.browsertools/config.json`
- **Debug Mode**: Always enabled for localhost development
- **Screenshot Storage**: `v2/screenshots/`
- **Performance Monitoring Interval**: 5 seconds
- **Verbose Logging**: Enabled for comprehensive debugging

**BrowserTools Configuration:**
```json
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
```

## Development Workflow

1. **Local Development**: Use `localhost:8080` with BrowserTools MCP integration
2. **Real-time Testing**: BrowserTools provides immediate feedback and debugging
3. **Production Deploy**: Commit to main branch → auto-deploys to GitHub Pages

### **Complete Development Process:**
```bash
# 1. Start development environment
./start-dev-server.sh
# → Python server starts on port 8080
# → BrowserTools MCP server starts on port 3025
# → Chrome opens with DevTools integration

# 2. Develop with real-time feedback
# → Instant visual feedback via BrowserTools
# → Console error monitoring
# → Performance metrics tracking
# → Screenshot documentation

# 3. Deploy to production
git add .
git commit -m "feat: descriptive change"
git push origin main
# → GitHub Actions automatically deploys
# → Live at: https://harshddes.github.io/BATTEL/
```

## Project Structure (FLAT & EFFICIENT)

```
v2/
├── index.html                    # Entry point (required by GitHub Pages)
├── public/
│   ├── css/
│   │   ├── main.css             # Core styles
│   │   └── components.css       # UI component styles
│   └── js/
│       ├── main.js              # Application logic
│       └── components.js        # UI component logic
├── .browsertools/
│   └── config.json              # BrowserTools MCP configuration
├── .cursor/rules/
│   └── senior-web-development.md # Development standards
├── screenshots/                 # BrowserTools screenshot storage
├── logs/                       # Development logs
├── .nojekyll                   # GitHub Pages Jekyll bypass
├── README.md                   # This technical documentation
└── start-dev-server.sh        # Development environment launcher
```

## Technical Stack & Dependencies

- **Frontend**: Modern HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Development Server**: Python 3.x HTTP server
- **BrowserTools MCP**: Port 3025 with Chrome DevTools integration
- **Local Server**: Python HTTP server on port 8080
- **Production Hosting**: GitHub Pages
- **Deployment**: Automated via GitHub Actions
- **Performance Monitoring**: Real-time Core Web Vitals tracking
- **Error Detection**: Instant JavaScript console error monitoring

## BrowserTools Integration - MANDATORY

**Why BrowserTools is Essential:**
- **Real-time Performance Monitoring**: Core Web Vitals tracking
- **Instant Error Detection**: JavaScript console errors immediately visible
- **Visual Documentation**: Automatic screenshot capture for major changes
- **Network Analysis**: Request/response monitoring for optimization
- **Development Efficiency**: 10x faster debugging and testing cycles

**BrowserTools provides:**
- Real-time performance monitoring
- Console error detection
- Screenshot documentation
- Network request analysis
- Chrome DevTools integration

## Technical Nuances & Gotchas

### **GitHub Pages Specific Issues:**
- **Deployment Delay**: 2-3 minutes from commit to live
- **CDN Cache Issues**: GitHub CDN may cache for 10 minutes
- **Jekyll Bypass**: `.nojekyll` file is ESSENTIAL for static sites
- **Case Sensitivity**: Filenames must match exactly (Linux filesystem)
- **Artifact Structure**: Files must be in root of deployed artifact

### **Development Environment Issues:**
- **Port Conflicts**: Ensure ports 8080 and 3025 are available
- **File Permissions**: `start-dev-server.sh` must be executable (`chmod +x`)
- **Browser Caching**: Use hard refresh (Cmd+Shift+R) for testing changes
- **BrowserTools Dependency**: Some features require Chrome DevTools
- **Python Version**: Requires Python 3.x for HTTP server

### **JavaScript Scope Management:**
```javascript
// Proper scope checking to prevent errors
if (performance.memory) {
    setInterval(() => {
        if (this.monitorMemory) {
            this.monitorMemory();
        }
    }, 30000);
}
```

## Production Deployment

Changes to this directory automatically deploy to production when pushed to main branch.

**Critical Deployment Files:**
- `v2/index.html` - Entry point (MUST exist)
- `v2/.nojekyll` - Prevents Jekyll processing
- `.github/workflows/deploy-pages.yml` - Deployment automation

**Live Site**: https://harshddes.github.io/BATTEL/

## Performance & Optimization

- **Performance Budget**: <3 second load time target
- **Core Web Vitals**: Continuously monitored via BrowserTools
- **Asset Optimization**: Images/CSS/JS optimized before deployment
- **SEO Requirements**: Meta tags, sitemap, robots.txt included
- **Accessibility**: WCAG 2.1 AA compliance standards

**This is a production-grade development environment with automated deployment, real-time monitoring, and professional development standards.** 