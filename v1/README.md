# TestBed Zero - Secure Zero-Knowledge Testing Platform

## 🔒 Zero-Knowledge Architecture

A secure testing platform where **all data is encrypted client-side** and the server has **zero access to plaintext data**. Even if our servers are compromised, your data remains secure because we don't have the keys to decrypt it.

### 🔑 Key Features

- **Client-Side Encryption**: AES-256-GCM encryption using Web Crypto API
- **Password-Derived Keys**: PBKDF2 with 100,000 iterations
- **Per-Project Encryption**: Unique symmetric keys for each project
- **File Encryption**: Chunked encryption for large files
- **Zero Server Access**: Server only stores encrypted data
- **Modern UI**: Professional interface explaining security features

## 🏗️ Architecture

```
Frontend (Browser)          Backend (Server)
├── Web Crypto API          ├── Express.js + TypeScript
├── AES-256-GCM             ├── MongoDB (encrypted data only)
├── PBKDF2 Key Derivation   ├── JWT Authentication
├── Per-Project Keys        ├── Clean Architecture
└── Zero-Knowledge Auth     └── RESTful API
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- MongoDB
- Git

### Backend Setup

1. **Clone and Install**
   ```bash
   git clone <your-repo>
   cd battel
   npm install
   ```

2. **Environment Configuration**
   ```bash
   # Create environment file
   cp .env.example .env
   
   # Edit .env with your configuration
   MONGO_URI=mongodb://localhost:27017/testbed-zero
   JWT_SECRET=your-very-secure-jwt-secret-change-this-in-production
   PORT=3000
   ```

3. **Start Development Server**
   ```bash
   # Development mode
   npm run dev
   
   # Or build and run
   npm run build
   npm start
   ```

### Frontend Setup

1. **Serve Frontend Files**
   ```bash
   # Simple HTTP server for development
   python -m http.server 8080
   # Or
   npx serve .
   ```

2. **Open Browser**
   ```
   http://localhost:8080
   ```

## 🔐 How Zero-Knowledge Works

### Registration Process
1. User enters email and password in browser
2. Password generates encryption keys locally (PBKDF2)
3. User's private key is encrypted with password-derived key
4. Only encrypted keys and salt are sent to server
5. **Password never leaves the browser**

### Login Process
1. User enters credentials
2. Server returns encrypted user data
3. Password derives keys locally to decrypt private key
4. All encryption/decryption happens client-side
5. **Server cannot access user's data**

### Data Encryption
1. Each project has unique symmetric encryption key
2. Files encrypted with per-file keys
3. All keys encrypted with user's master key
4. Server stores only encrypted data
5. **Zero plaintext data on server**

## 📁 Project Structure

```
├── src/
│   ├── core/              # Business logic
│   │   ├── user.service.ts
│   │   ├── project.service.ts
│   │   ├── file.service.ts
│   │   └── test.service.ts
│   ├── infrastructure/    # Data layer
│   │   ├── db.ts
│   │   ├── *.model.ts
│   │   └── *.repository.ts
│   ├── interfaces/        # API controllers
│   │   ├── auth.controller.ts
│   │   ├── project.controller.ts
│   │   ├── file.controller.ts
│   │   └── test.controller.ts
│   ├── shared/           # Types and utilities
│   │   ├── crypto.types.ts
│   │   ├── api.types.ts
│   │   ├── user.types.ts
│   │   └── auth.middleware.ts
│   └── app.ts            # Main application
├── crypto.js             # Client-side encryption
├── app.js               # Frontend application
├── index.html           # Main interface
└── package.json
```

## 🔧 API Endpoints

### Authentication (No Auth Required)
- `POST /auth/register` - User registration with encrypted keys
- `POST /auth/login` - Returns encrypted user data for key derivation

### Projects (Auth Required)
- `POST /projects` - Create encrypted project
- `GET /projects` - Get user's encrypted projects
- `GET /projects/:id` - Get specific project
- `DELETE /projects/:id` - Delete project

### Files (Auth Required)
- `POST /files` - Upload encrypted file
- `GET /files` - Get user's encrypted files
- `GET /files/:id` - Download encrypted file
- `DELETE /files/:id` - Delete file

### Tests (Auth Required)
- `POST /tests` - Create encrypted test
- `GET /tests` - Get user's tests
- `GET /tests/:id` - Get specific test

## 🛡️ Security Features

### Encryption Specifications
- **Algorithm**: AES-256-GCM
- **Key Derivation**: PBKDF2-SHA256 (100,000 iterations)
- **Key Exchange**: ECDH P-256
- **Random Generation**: Crypto.getRandomValues()

### Security Principles
1. **Zero-Knowledge**: Server never sees plaintext
2. **Client-Side Only**: All crypto operations in browser
3. **Forward Secrecy**: Unique keys per session/project
4. **Salt & IV**: Proper randomization for each encryption
5. **Secure Storage**: Encrypted key storage

## 🧪 Testing

```bash
# Run tests
npm test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage
```

## 🌐 Deployment

### Backend Deployment
```bash
# Build for production
npm run build

# Start production server
NODE_ENV=production npm start
```

### Frontend Deployment (GitHub Pages)
1. Push frontend files to `gh-pages` branch
2. Enable GitHub Pages in repository settings
3. Update `apiBase` in `app.js` to your backend URL

### Environment Variables (Production)
```env
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/testbed-zero
JWT_SECRET=your-super-secure-production-secret
NODE_ENV=production
PORT=3000
```

## 🔒 Security Considerations

### Production Checklist
- [ ] Use strong JWT secret (32+ random characters)
- [ ] Enable HTTPS for all connections
- [ ] Set secure MongoDB connection
- [ ] Enable CORS for frontend domain only
- [ ] Use environment variables for secrets
- [ ] Regular security audits
- [ ] Monitor for vulnerabilities

### Zero-Knowledge Guarantee
- ✅ Passwords never sent to server
- ✅ All encryption happens client-side
- ✅ Server cannot decrypt user data
- ✅ Compromised server = data still secure
- ✅ Perfect forward secrecy

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

- **Documentation**: Check this README
- **Issues**: GitHub Issues tab
- **Security**: Report security issues privately

---

**⚠️ Important**: This is a zero-knowledge system. If you forget your password, **your data cannot be recovered**. The server cannot decrypt your data without your password-derived keys. 