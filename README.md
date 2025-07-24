# 🔐 BATTEL - Secure Zero-Knowledge Testing Platform

**Professional-grade privacy-preserving backend architecture for secure testing and data processing**

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.1.0-lightgrey.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.16.3-green.svg)](https://www.mongodb.com/)

## 🎯 **Architecture Overview**

BATTEL implements a **zero-knowledge secure backend** with advanced cryptographic features:

- **🔐 Zero-Knowledge Authentication**: Client-side key derivation, no passwords stored
- **🛡️ End-to-End Encryption**: All data encrypted before transmission
- **🔒 Homomorphic Computation**: Privacy-preserving AI/ML operations
- **🌐 Federated Learning**: Distributed AI without data exposure
- **⚡ TEE Integration**: Trusted Execution Environment support

### **Project Structure**
```
BATTEL/
├── v1/                     # Main application (production-ready)
│   ├── src/
│   │   ├── core/          # Business logic & services
│   │   ├── infrastructure/ # Database & external integrations
│   │   ├── interfaces/    # API controllers & endpoints
│   │   └── shared/        # Types, utilities, middleware
│   ├── dist/              # Compiled JavaScript (auto-generated)
│   └── package.json       # Dependencies & scripts
├── v2/                     # Next version development
├── testbedzv2/            # Testing environment
└── node_modules/          # Auto-generated dependencies (ignored)
```

---

## 🚀 **Prerequisites & Environment Setup**

### **System Requirements**
- **Node.js**: `≥ 18.0.0`
- **npm**: `≥ 8.0.0` 
- **TypeScript**: `≥ 5.0.0`
- **MongoDB**: `≥ 6.0.0` (for production)

### **Environment Verification Commands**

**Before installation, verify your system:**

```bash
# Check Node.js version (required: ≥18.0.0)
node --version

# Check npm version (required: ≥8.0.0)
npm --version

# Check if TypeScript is globally available
npx tsc --version

# Verify MongoDB installation (if using local instance)
mongod --version

# Check available system memory (recommended: ≥4GB)
# Windows:
wmic computersystem get TotalPhysicalMemory
# Linux/Mac:
free -h
```

**Expected Output:**
```bash
$ node --version
v18.17.0  ✅

$ npm --version  
9.6.7     ✅

$ npx tsc --version
Version 5.8.3  ✅
```

---

## 📦 **Installation & Setup**

### **1. Clone Repository**
```bash
git clone https://github.com/your-username/BATTEL.git
cd BATTEL
```

### **2. Install Dependencies**
```bash
# Navigate to main application
cd v1

# Install all dependencies (this creates node_modules/)
npm install

# Verify installation
npm list --depth=0
```

### **3. Environment Configuration**
```bash
# Create environment file (v1/.env)
cp .env.example .env

# Configure essential variables:
# JWT_SECRET=your-super-secure-secret-key-here
# PORT=3000
# MONGODB_URI=mongodb://localhost:27017/battel
```

### **4. Build & Start**
```bash
# Compile TypeScript to JavaScript
npm run build

# Start production server
npm start

# OR for development with hot-reload
npm run dev
```

**Verification:**
- Backend Health: `http://localhost:3000/health`
- API Documentation: `http://localhost:3000/api/docs`

---

## 🛠️ **Development Workflow**

### **Available Commands**
```bash
# Development
npm run dev          # Start with hot-reload (ts-node)
npm run build        # Compile TypeScript → JavaScript
npm run clean        # Remove dist/ directory

# Production
npm start            # Run compiled app (requires build first)
npm run start:demo   # Quick demo with default env vars

# Testing
npm test             # Run Jest test suite
npm run test:watch   # Run tests in watch mode

# Quality Assurance
npm run lint         # ESLint code analysis
npm run type-check   # TypeScript type validation
```

### **Development Best Practices**

1. **Type Safety**: All code must pass TypeScript strict mode
2. **Testing**: Maintain >80% code coverage
3. **Security**: Never commit `.env` files or sensitive data
4. **Architecture**: Follow clean architecture patterns (see `src/` structure)

---

## 🏗️ **Advanced Features**

### **Cryptographic Operations**
```typescript
import { EnhancedCryptoUtils } from './enhanced-crypto.js';

// Homomorphic encryption for privacy-preserving computation
const crypto = new EnhancedCryptoUtils();
const encryptedResult = await crypto.processWithHomomorphicEncryption(data, modelType);
```

### **Privacy-Preserving AI**
```typescript
import { PrivacyPreservingAIService } from './src/core/privacy-ai.service';

// Federated learning without data exposure
const aiService = new PrivacyPreservingAIService();
const result = await aiService.processWithFederatedLearning(request);
```

### **Zero-Knowledge Authentication**
```typescript
// Client-side key derivation (no passwords sent to server)
const keyManager = new KeyManager();
await keyManager.initializeUser(email, password);
```

---

## 🔧 **Browser Tools Integration**

For development and debugging, BATTEL integrates with **BrowserTools MCP**:

```bash
# Start debug environment (Windows)
./start-debug.bat

# Manual setup
npm start                                    # Backend
npx @agentdeskai/browser-tools-server@1.2.0 # Browser integration
```

See `BROWSERTOOLS_COMPLETE_SETUP.md` for detailed configuration.

---

## 📊 **Database Schema**

**Collections:**
- `users`: Encrypted user credentials & keys
- `projects`: Zero-knowledge project metadata
- `files`: Encrypted file storage references
- `tests`: Secure test definitions & results

**Security Model:**
- All data encrypted client-side before storage
- Server never has access to plaintext data
- Keys derived from user passwords (PBKDF2)

---

## 🚀 **Deployment**

### **Production Environment**
```bash
# Environment variables (production)
NODE_ENV=production
JWT_SECRET=your-256-bit-secret
MONGODB_URI=mongodb://your-production-db
PORT=443

# SSL/TLS Configuration
SSL_CERT_PATH=/path/to/cert.pem
SSL_KEY_PATH=/path/to/private.key

# Build for production
npm run build
npm start
```

### **Docker Deployment**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY v1/package*.json ./
RUN npm ci --only=production
COPY v1/dist ./dist
EXPOSE 3000
CMD ["npm", "start"]
```

---

## ⚠️ **Security Considerations**

- **⚠️ Critical**: Change default `JWT_SECRET` in production
- **🔐 Encryption**: All sensitive data encrypted with AES-256-GCM
- **🛡️ Authentication**: JWT tokens with 1-hour expiration
- **🔑 Key Management**: Client-side key derivation (PBKDF2)
- **🚫 No Plaintext**: Server never processes unencrypted user data

---

## 🧪 **Testing**

```bash
# Run comprehensive test suite
npm test

# Test specific components
npm test -- --testPathPattern=user.service
npm test -- --testPathPattern=crypto

# Performance testing
npm run test:performance
```

**Test Coverage Requirements:**
- Unit Tests: >80%
- Integration Tests: All API endpoints
- Security Tests: Cryptographic functions

---

## 📚 **API Documentation**

### **Authentication Endpoints**
```
POST /api/auth/register  # Zero-knowledge user registration
POST /api/auth/login     # Challenge-response authentication
```

### **Project Management**
```
POST /api/projects       # Create encrypted project
GET  /api/projects       # List user projects
GET  /api/projects/:id   # Get project details
```

### **File Operations**
```
POST /api/files/upload   # Encrypted file upload
GET  /api/files/:id      # Retrieve encrypted file
```

---

## 🤝 **Contributing**

1. **Fork** the repository
2. **Create** feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** changes: `git commit -m 'feat: add amazing feature'`
4. **Push** to branch: `git push origin feature/amazing-feature`
5. **Submit** Pull Request

**Commit Convention:**
```
feat(scope): description     # New feature
fix(scope): description      # Bug fix
docs(scope): description     # Documentation
test(scope): description     # Testing
refactor(scope): description # Code refactoring
```

---

## 📄 **License**

ISC License - See [LICENSE](LICENSE) file for details.

---

## 🆘 **Troubleshooting**

### **Common Issues**

**Build Errors:**
```bash
# Clear TypeScript cache
npm run clean && npm run build

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**Database Connection:**
```bash
# Check MongoDB status
mongod --version
# Verify connection string in .env
```

**Port Conflicts:**
```bash
# Check what's using port 3000
netstat -tulpn | grep :3000
# Or use different port: PORT=3001 npm start
```

---

**For support or questions, create an issue in the GitHub repository.** 