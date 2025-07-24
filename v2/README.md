# V2 - Production Website

## Quick Start

```bash
# Start development environment
./start-dev-server.sh

# View locally
open http://localhost:8080
```

## Development Workflow

1. **Local Development**: Use `localhost:8080` with BrowserTools MCP integration
2. **Real-time Testing**: BrowserTools provides immediate feedback and debugging
3. **Production Deploy**: Commit to main branch → auto-deploys to GitHub Pages

## Project Structure

```
v2/
├── index.html              # Entry point
├── public/
│   ├── css/               # Stylesheets
│   └── js/                # JavaScript
├── .browsertools/         # BrowserTools configuration
├── .nojekyll             # GitHub Pages optimization
└── start-dev-server.sh   # Development server script
```

## Technical Stack

- **Frontend**: Modern HTML5, CSS3, Vanilla JavaScript
- **Development**: BrowserTools MCP on port 3025
- **Local Server**: Python HTTP server on port 8080
- **Production**: GitHub Pages at `https://harshddes.github.io/BATTEL/`
- **Deployment**: Automated via GitHub Actions

## BrowserTools Integration

**MANDATORY for development** - provides:
- Real-time performance monitoring
- Console error detection
- Screenshot documentation
- Network request analysis

## Deployment

Changes to this directory automatically deploy to production when pushed to main branch.

**Live Site**: https://harshddes.github.io/BATTEL/ 