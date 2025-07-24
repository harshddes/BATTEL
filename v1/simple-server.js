const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// In-memory storage for demo
const users = new Map();
let userIdCounter = 1;

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(cors());
app.use(express.static(__dirname));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Registration endpoint
app.post('/auth/register', (req, res) => {
  try {
    console.log('Registration request received:', req.body.email);
    
    const { email, salt, encryptedPrivateKey, publicKey } = req.body;
    
    if (!email || !salt || !encryptedPrivateKey || !publicKey) {
      return res.status(400).json({
        success: false,
        error: 'Missing required encryption data'
      });
    }

    // Check if user exists
    if (users.has(email)) {
      return res.status(400).json({
        success: false,
        error: 'User already exists with this email'
      });
    }

    // Save user
    const user = {
      id: (userIdCounter++).toString(),
      email,
      salt,
      encryptedPrivateKey,
      publicKey,
      createdAt: new Date()
    };
    
    users.set(email, user);
    console.log(`User registered successfully: ${email}`);
    
    res.status(201).json({
      success: true,
      message: 'User registered successfully'
    });
    
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      error: 'Registration failed: ' + error.message
    });
  }
});

// Login endpoint
app.post('/auth/login', (req, res) => {
  try {
    console.log('Login request received:', req.body.email);
    
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Email is required'
      });
    }

    const user = users.get(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }

    // Return encrypted user data for client-side key derivation
    res.json({
      success: true,
      userData: {
        salt: user.salt,
        encryptedPrivateKey: user.encryptedPrivateKey,
        publicKey: user.publicKey
      },
      token: 'demo-token-' + user.id
    });
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      error: 'Authentication failed: ' + error.message
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Demo server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`Frontend: http://localhost:${PORT}/index.html`);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
}); 