# Project Plan: Secure “Zero-Access” Backend Architecture for a Testing Platform

## Overview
This project implements a secure backend for a testing platform where the backend has "zero-access" to sensitive data. Based on the PDF specification, data is encrypted client-side, and the backend processes encrypted data without decryption keys. This ensures privacy and security.

### Goals
- Build a scalable, secure backend.
- Use clean architecture principles as per senior developer standards.
- First iteration: MVP with basic user authentication, test creation, and encrypted storage/retrieval.
- Technologies: TypeScript, Node.js, Express for API, MongoDB for database (with encryption handling), JWT for auth.

## Scope for First Iteration
- User registration/login with JWT.
- Create, store, retrieve tests (encrypted).
- Zero-access: Encryption/decryption happens client-side.
- Basic API endpoints.
- No frontend in this iteration; focus on backend.

## Project Structure
Follow the structure from notimepass.mdc:
```
project/
├── src/
│   ├── core/           # Core business logic
│   ├── infrastructure/ # DB, APIs
│   ├── interfaces/     # Controllers
│   ├── shared/         # Utils, types
│   └── tests/          # Tests
├── docs/              # Documentation
├── scripts/           # Scripts
└── config/            # Configurations
```

## Iterations
1. **Setup**: Initialize repo, dependencies, structure.
2. **Auth**: Implement user auth.
3. **Core Logic**: Test creation/handling with encryption placeholders.
4. **API**: Expose endpoints.
5. **Testing**: Unit/integration tests.
6. **Deployment Prep**: Config for deployment.

## Next Steps
- Initialize package.json and install dependencies.
- Create directory structure.
- Implement in phases using edit_file for code changes. 