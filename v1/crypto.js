/**
 * Client-Side Encryption Utilities
 * Zero-Knowledge Architecture - Server never sees plaintext data
 */

class CryptoUtils {
  constructor() {
    this.algorithm = 'AES-GCM';
    this.keyLength = 256;
    this.ivLength = 12;
  }

  /**
   * Generate random salt
   */
  generateSalt() {
    return crypto.getRandomValues(new Uint8Array(32));
  }

  /**
   * Generate a cryptographic key from password using PBKDF2
   */
  async deriveKeyFromPassword(password, salt) {
    const encoder = new TextEncoder();
    const passwordKey = await crypto.subtle.importKey(
      'raw',
      encoder.encode(password),
      'PBKDF2',
      false,
      ['deriveKey']
    );

    return crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: 100000,
        hash: 'SHA-256'
      },
      passwordKey,
      { name: this.algorithm, length: this.keyLength },
      false,
      ['encrypt', 'decrypt']
    );
  }

  /**
   * Generate asymmetric key pair for user
   */
  async generateKeyPair() {
    return crypto.subtle.generateKey(
      {
        name: 'ECDH',
        namedCurve: 'P-256'
      },
      true,
      ['deriveKey']
    );
  }

  /**
   * Generate symmetric key for projects/documents
   */
  async generateSymmetricKey() {
    return crypto.subtle.generateKey(
      { name: this.algorithm, length: this.keyLength },
      true,
      ['encrypt', 'decrypt']
    );
  }

  /**
   * Encrypt data with provided key
   */
  async encryptData(data, key) {
    const encoder = new TextEncoder();
    const iv = crypto.getRandomValues(new Uint8Array(this.ivLength));
    
    const encrypted = await crypto.subtle.encrypt(
      { name: this.algorithm, iv: iv },
      key,
      encoder.encode(JSON.stringify(data))
    );

    return {
      encrypted: Array.from(new Uint8Array(encrypted)),
      iv: Array.from(iv)
    };
  }

  /**
   * Decrypt data with provided key
   */
  async decryptData(encryptedData, key) {
    const { encrypted, iv } = encryptedData;
    
    const decrypted = await crypto.subtle.decrypt(
      { name: this.algorithm, iv: new Uint8Array(iv) },
      key,
      new Uint8Array(encrypted)
    );

    const decoder = new TextDecoder();
    return JSON.parse(decoder.decode(decrypted));
  }

  /**
   * Export key for storage/sharing
   */
  async exportKey(key) {
    const exported = await crypto.subtle.exportKey('raw', key);
    return Array.from(new Uint8Array(exported));
  }

  /**
   * Import key from stored data
   */
  async importKey(keyData) {
    return crypto.subtle.importKey(
      'raw',
      new Uint8Array(keyData),
      { name: this.algorithm },
      false,
      ['encrypt', 'decrypt']
    );
  }

  /**
   * Encrypt key with another key
   */
  async encryptKey(keyToEncrypt, encryptingKey) {
    const keyData = await this.exportKey(keyToEncrypt);
    return this.encryptData(keyData, encryptingKey);
  }

  /**
   * Encrypt file in chunks for large files
   */
  async encryptFile(file, key) {
    const chunkSize = 1024 * 1024; // 1MB chunks
    const chunks = [];
    
    for (let i = 0; i < file.size; i += chunkSize) {
      const chunk = file.slice(i, i + chunkSize);
      const arrayBuffer = await chunk.arrayBuffer();
      const iv = crypto.getRandomValues(new Uint8Array(this.ivLength));
      
      const encrypted = await crypto.subtle.encrypt(
        { name: this.algorithm, iv: iv },
        key,
        arrayBuffer
      );
      
      chunks.push({
        encrypted: Array.from(new Uint8Array(encrypted)),
        iv: Array.from(iv),
        index: Math.floor(i / chunkSize)
      });
    }
    
    return {
      chunks,
      totalSize: file.size,
      fileName: file.name,
      fileType: file.type
    };
  }

  /**
   * Decrypt file from chunks
   */
  async decryptFile(encryptedFile, key) {
    const { chunks, fileName, fileType } = encryptedFile;
    const decryptedChunks = [];
    
    // Sort chunks by index
    chunks.sort((a, b) => a.index - b.index);
    
    for (const chunk of chunks) {
      const decrypted = await crypto.subtle.decrypt(
        { name: this.algorithm, iv: new Uint8Array(chunk.iv) },
        key,
        new Uint8Array(chunk.encrypted)
      );
      decryptedChunks.push(decrypted);
    }
    
    const blob = new Blob(decryptedChunks, { type: fileType });
    return new File([blob], fileName, { type: fileType });
  }
}

// Key Management for Zero-Knowledge Architecture
class KeyManager {
  constructor() {
    this.crypto = new CryptoUtils();
    this.userKeys = null;
    this.projectKeys = new Map();
  }

  /**
   * Initialize user from password (zero-knowledge auth)
   */
  async initializeUser(email, password) {
    const salt = this.crypto.generateSalt();
    
    // Derive user's master key from password
    const masterKey = await this.crypto.deriveKeyFromPassword(password, salt);
    
    // Generate user's key pair
    const keyPair = await this.crypto.generateKeyPair();
    
    // Store encrypted private key (encrypted with master key)
    const privateKeyData = await crypto.subtle.exportKey('pkcs8', keyPair.privateKey);
    const encryptedPrivateKey = await this.crypto.encryptData(
      Array.from(new Uint8Array(privateKeyData)),
      masterKey
    );
    
    const publicKeyData = await crypto.subtle.exportKey('spki', keyPair.publicKey);
    
    this.userKeys = {
      email,
      salt: Array.from(salt),
      encryptedPrivateKey,
      publicKey: Array.from(new Uint8Array(publicKeyData)),
      masterKey
    };
    
    return {
      email,
      salt: Array.from(salt),
      encryptedPrivateKey,
      publicKey: Array.from(new Uint8Array(publicKeyData))
    };
  }

  /**
   * Login user with password (derive keys from password)
   */
  async loginUser(email, password, userData) {
    const { salt, encryptedPrivateKey, publicKey } = userData;
    
    // Derive master key from password
    const masterKey = await this.crypto.deriveKeyFromPassword(
      password, 
      new Uint8Array(salt)
    );
    
    try {
      // Decrypt private key
      const privateKeyData = await this.crypto.decryptData(encryptedPrivateKey, masterKey);
      const privateKey = await crypto.subtle.importKey(
        'pkcs8',
        new Uint8Array(privateKeyData),
        { name: 'ECDH', namedCurve: 'P-256' },
        false,
        ['deriveKey']
      );
      
      this.userKeys = {
        email,
        salt,
        encryptedPrivateKey,
        publicKey,
        masterKey,
        privateKey
      };
      
      return true;
    } catch (error) {
      throw new Error('Invalid credentials');
    }
  }

  /**
   * Create new project with unique encryption key
   */
  async createProject(projectName) {
    const projectKey = await this.crypto.generateSymmetricKey();
    const projectId = 'proj_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    
    // Encrypt project metadata
    const projectMetadata = {
      name: projectName,
      created: new Date().toISOString(),
      owner: this.userKeys.email
    };
    
    const encryptedMetadata = await this.crypto.encryptData(projectMetadata, projectKey);
    
    // Store project key encrypted with user's master key
    const encryptedProjectKey = await this.crypto.encryptKey(projectKey, this.userKeys.masterKey);
    
    this.projectKeys.set(projectId, projectKey);
    
    return {
      projectId,
      encryptedMetadata,
      encryptedProjectKey
    };
  }

  /**
   * Decrypt project data
   */
  async decryptProjectData(projectId, encryptedData) {
    const projectKey = this.projectKeys.get(projectId);
    if (!projectKey) {
      throw new Error('Project key not available');
    }
    
    return this.crypto.decryptData(encryptedData, projectKey);
  }

  /**
   * Load project key from encrypted storage
   */
  async loadProjectKey(projectId, encryptedProjectKey) {
    const keyData = await this.crypto.decryptData(encryptedProjectKey, this.userKeys.masterKey);
    const projectKey = await this.crypto.importKey(keyData);
    this.projectKeys.set(projectId, projectKey);
    return projectKey;
  }
} 