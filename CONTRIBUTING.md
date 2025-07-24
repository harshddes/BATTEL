# 🤝 Contributing to BATTEL

Thank you for your interest in contributing to **BATTEL** - a secure zero-knowledge testing platform! This guide will help you get started with contributing to the project.

## 📋 **Table of Contents**

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Security Guidelines](#security-guidelines)
- [Testing Requirements](#testing-requirements)
- [Documentation](#documentation)
- [Submitting Changes](#submitting-changes)
- [Review Process](#review-process)

---

## 🛡️ **Code of Conduct**

This project adheres to professional software development standards. All contributors are expected to:

- **Maintain professionalism** in all interactions
- **Respect diverse perspectives** and experiences
- **Focus on constructive feedback** during code reviews
- **Prioritize security and privacy** in all contributions
- **Follow established coding standards** and best practices

---

## 🚀 **Getting Started**

### **Prerequisites**

Before contributing, ensure you have:

- **Node.js** `≥ 18.0.0`
- **npm** `≥ 8.0.0`
- **Git** with proper configuration
- **Understanding of TypeScript** and clean architecture principles
- **Familiarity with cryptographic concepts** (for security-related contributions)

### **Setup Development Environment**

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/BATTEL.git
   cd BATTEL
   ```

3. **Install dependencies**:
   ```bash
   cd v1
   npm install
   ```

4. **Create environment file**:
   ```bash
   cp .env.example .env
   # Configure your local environment variables
   ```

5. **Verify setup**:
   ```bash
   npm run build
   npm test
   npm start
   ```

---

## 🔄 **Development Workflow**

### **Branch Strategy**

We follow **Git Flow** with these branches:

- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/ISSUE-123-description` - Feature development
- `hotfix/ISSUE-456-description` - Critical production fixes

### **Creating a Feature Branch**

```bash
# Start from develop branch
git checkout develop
git pull origin develop

# Create feature branch
git checkout -b feature/123-add-homomorphic-encryption

# Make your changes and commit
git add .
git commit -m "feat(crypto): implement homomorphic encryption for privacy-preserving computation"

# Push branch
git push origin feature/123-add-homomorphic-encryption
```

### **Commit Convention**

Follow **Conventional Commits** specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `security`: Security improvements

**Examples:**
```bash
feat(auth): implement zero-knowledge authentication
fix(crypto): resolve key derivation memory leak
docs(api): add homomorphic encryption endpoint documentation
test(user): increase user service test coverage
security(jwt): implement secure token rotation
```

---

## 💻 **Coding Standards**

### **TypeScript Standards**

- **Strict mode enabled** - All code must pass TypeScript strict checks
- **Explicit types** - Avoid `any` types; use proper type definitions
- **Interface over type** aliases for object definitions
- **Generic constraints** for reusable functions

### **Architecture Principles**

Follow **Clean Architecture** patterns:

```typescript
// Domain Layer - Pure business logic
export interface UserRepository {
  findById(id: string): Promise<User | null>;
}

// Application Layer - Use cases
export class UserService {
  constructor(private userRepo: UserRepository) {}
  
  async getUser(id: string): Promise<User | null> {
    return this.userRepo.findById(id);
  }
}

// Infrastructure Layer - External concerns
export class DatabaseUserRepository implements UserRepository {
  async findById(id: string): Promise<User | null> {
    // Database implementation
  }
}
```

### **Code Quality Requirements**

- **Zero tolerance for `console.log`** in production code
- **Comprehensive error handling** with proper error types
- **Input validation** for all external data
- **Memory efficiency** - avoid memory leaks
- **Performance considerations** for all operations

### **File Organization**

```
src/
├── core/           # Business logic (services)
├── infrastructure/ # External integrations (repositories, databases)
├── interfaces/     # Controllers and API endpoints
└── shared/         # Types, utilities, middleware
```

---

## 🔒 **Security Guidelines**

### **Critical Security Requirements**

- **Never commit sensitive data** (keys, passwords, secrets)
- **Validate all inputs** before processing
- **Use parameterized queries** to prevent injection attacks
- **Implement proper authentication** and authorization
- **Follow cryptographic best practices**

### **Cryptographic Standards**

- **AES-256-GCM** for symmetric encryption
- **PBKDF2** with 100,000+ iterations for key derivation
- **Proper random number generation** for salts and keys
- **Secure key storage** and management practices

### **Privacy Requirements**

- **Zero-knowledge principles** - server never sees plaintext data
- **Client-side encryption** before transmission
- **Minimal data collection** and retention
- **Privacy-preserving computation** methods

---

## 🧪 **Testing Requirements**

### **Test Coverage Standards**

- **Unit Tests**: >80% coverage required
- **Integration Tests**: All API endpoints
- **Security Tests**: Cryptographic functions
- **Performance Tests**: Critical paths

### **Testing Structure**

```typescript
// Follow AAA pattern
describe('UserService', () => {
  it('should create user with valid data', async () => {
    // Arrange
    const userData = createValidUserData();
    const mockRepo = createMockUserRepository();
    const service = new UserService(mockRepo);

    // Act
    const result = await service.createUser(userData);

    // Assert
    expect(result.isSuccess).toBe(true);
    expect(mockRepo.save).toHaveBeenCalledWith(userData);
  });
});
```

### **Test Commands**

```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Run specific test file
npm test -- user.service.test.ts

# Watch mode for development
npm run test:watch
```

---

## 📚 **Documentation**

### **Code Documentation**

- **Document WHY, not WHAT** - explain reasoning and business logic
- **Include examples** for complex functions
- **API documentation** with clear request/response formats
- **Security considerations** for sensitive functions

```typescript
/**
 * Derives encryption key from user password using PBKDF2
 * 
 * Uses 100,000 iterations with random salt to prevent rainbow table attacks.
 * The derived key is used for client-side encryption before data transmission.
 * 
 * @param password - User's plaintext password
 * @param salt - Cryptographically secure random salt
 * @returns Promise<CryptoKey> - AES-256 encryption key
 * 
 * @security Critical - Never log password or derived key
 * @performance ~100ms on typical hardware due to PBKDF2 iterations
 */
async deriveKeyFromPassword(password: string, salt: Uint8Array): Promise<CryptoKey> {
  // Implementation
}
```

### **README Updates**

Update documentation when adding:
- New features or capabilities
- Configuration options
- API endpoints
- Dependencies or requirements

---

## 🔄 **Submitting Changes**

### **Pull Request Process**

1. **Create feature branch** from `develop`
2. **Implement changes** following coding standards
3. **Add comprehensive tests** with good coverage
4. **Update documentation** as needed
5. **Ensure all checks pass**:
   ```bash
   npm run build
   npm test
   npm run lint
   ```
6. **Submit pull request** with detailed description

### **Pull Request Template**

Use the provided PR template and ensure:
- **Clear description** of changes and motivation
- **Related issues** linked appropriately
- **Testing evidence** provided
- **Security implications** assessed
- **Performance impact** evaluated

### **Commit Message Quality**

```bash
# Good commit messages
feat(auth): implement zero-knowledge authentication system
fix(crypto): resolve memory leak in key derivation process
docs(api): add comprehensive API documentation for file endpoints

# Bad commit messages
fix bug
update code
changes
```

---

## 👥 **Review Process**

### **Code Review Criteria**

Reviewers will evaluate:

1. **Functionality** - Does it work as intended?
2. **Security** - Are there security implications?
3. **Performance** - Any performance impact?
4. **Code Quality** - Follows project standards?
5. **Tests** - Adequate test coverage?
6. **Documentation** - Properly documented?

### **Review Timeline**

- **Initial Review**: Within 2-3 business days
- **Follow-up Reviews**: Within 1 business day
- **Maintainer Review**: Required for security-related changes

### **Addressing Feedback**

- **Respond promptly** to review comments
- **Make requested changes** in additional commits
- **Explain your reasoning** if you disagree with feedback
- **Ask for clarification** if comments are unclear

---

## 🏷️ **Issue and Project Management**

### **Bug Reports**

Use the bug report template and include:
- **Detailed reproduction steps**
- **Environment information**
- **Error logs or screenshots**
- **Expected vs actual behavior**

### **Feature Requests**

Use the feature request template and include:
- **Clear problem statement**
- **Proposed solution**
- **Benefits and impact**
- **Implementation considerations**

### **Labels and Milestones**

Common labels:
- `bug` - Something isn't working
- `enhancement` - New feature or improvement
- `security` - Security-related issues
- `performance` - Performance improvements
- `documentation` - Documentation updates
- `good-first-issue` - Good for newcomers

---

## 🎯 **Getting Help**

### **Resources**

- **Documentation**: Check README and docs/ directory
- **Issues**: Search existing issues before creating new ones
- **Discussions**: Use GitHub Discussions for questions
- **Code Examples**: Review existing code for patterns

### **Contact**

For security-related issues, contact maintainers privately before creating public issues.

---

## 🏆 **Recognition**

Contributors will be recognized through:
- **Contributors list** in README
- **Changelog attribution** for significant contributions
- **Maintainer status** for consistent, high-quality contributions

---

**Thank you for contributing to BATTEL! Your efforts help make secure, privacy-preserving technology more accessible to everyone.** 