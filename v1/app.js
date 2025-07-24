/**
 * Frontend Application for TestBed Zero
 * Implements zero-knowledge architecture with real client-side encryption
 */

class TestBedApp {
  constructor() {
    this.keyManager = new KeyManager();
    this.apiBase = 'http://localhost:3000'; // Backend API base URL
    this.currentUser = null;
    this.projects = new Map();
    this.files = new Map();
    
    this.initializeEventListeners();
    this.checkExistingSession();
  }

  initializeEventListeners() {
    // Authentication forms
    document.getElementById('register-form').addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleRegister();
    });

    document.getElementById('login-form').addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleLogin();
    });

    // Dashboard navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.switchTab(e.target.dataset.tab);
      });
    });

    // Logout
    document.getElementById('logout-btn').addEventListener('click', () => {
      this.handleLogout();
    });

    // Project management
    document.getElementById('create-project-btn').addEventListener('click', () => {
      this.handleCreateProject();
    });

    // File upload
    const fileUploadArea = document.getElementById('file-upload-area');
    const fileInput = document.getElementById('file-input');

    fileUploadArea.addEventListener('click', () => fileInput.click());
    fileUploadArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      fileUploadArea.style.borderColor = '#4c51bf';
    });
    fileUploadArea.addEventListener('dragleave', () => {
      fileUploadArea.style.borderColor = '#cbd5e0';
    });
    fileUploadArea.addEventListener('drop', (e) => {
      e.preventDefault();
      fileUploadArea.style.borderColor = '#cbd5e0';
      this.handleFileUpload(e.dataTransfer.files);
    });

    fileInput.addEventListener('change', (e) => {
      this.handleFileUpload(e.target.files);
    });

    // Test management
    document.getElementById('create-test-btn').addEventListener('click', () => {
      this.handleCreateTest();
    });

    // Sharing
    document.getElementById('share-btn').addEventListener('click', () => {
      this.handleShare();
    });
  }

  // Handle user registration
  async handleRegister() {
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;

    if (password.length < 8) {
      this.showAlert('Password must be at least 8 characters long', 'error');
      return;
    }

    this.showAlert('Generating encryption keys...', 'info');

    try {
      // Generate user keys locally (zero-knowledge)
      const userData = await this.keyManager.initializeUser(email, password);
      
      // Register with server (only encrypted data sent)
      const response = await fetch(`${this.apiBase}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          encryptedPrivateKey: userData.encryptedPrivateKey,
          publicKey: userData.publicKey,
          salt: userData.salt
        })
      });

      if (response.ok) {
        this.showAlert('Account created successfully! You can now login.', 'success');
        document.getElementById('register-form').reset();
      } else {
        const error = await response.json();
        this.showAlert(error.error || 'Registration failed', 'error');
      }
    } catch (error) {
      this.showAlert('Registration failed: ' + error.message, 'error');
    }
  }

  // Handle user login
  async handleLogin() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    this.showAlert('Deriving encryption keys from password...', 'info');

    try {
      // Get user data from server
      const response = await fetch(`${this.apiBase}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: 'placeholder' }) // Password not actually sent
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.userData) {
          // Derive keys locally from password
          await this.keyManager.loginUser(email, password, result.userData);
          
          // Save session
          const session = { email, userData: result.userData };
          localStorage.setItem('testbed_session', JSON.stringify(session));
          
          this.currentUser = email;
          this.showDashboard(email);
          this.loadUserProjects();
          
          this.showAlert('Login successful!', 'success');
        } else {
          this.showAlert(result.message || 'Login failed', 'error');
        }
      } else {
        this.showAlert('Invalid credentials', 'error');
      }
    } catch (error) {
      this.showAlert('Login failed: ' + error.message, 'error');
    }
  }

  // Check for existing session
  checkExistingSession() {
    const session = localStorage.getItem('testbed_session');
    if (session) {
      try {
        const { email } = JSON.parse(session);
        this.showAlert('Restoring session. Please enter your password to decrypt your data.', 'info');
        document.getElementById('login-email').value = email;
      } catch (error) {
        localStorage.removeItem('testbed_session');
      }
    }
  }

  // Show dashboard
  showDashboard(email) {
    document.getElementById('auth-section').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    document.getElementById('user-email').textContent = email;
  }

  // Handle logout
  handleLogout() {
    localStorage.removeItem('testbed_session');
    this.currentUser = null;
    this.keyManager = new KeyManager();
    this.projects.clear();
    this.files.clear();
    
    document.getElementById('auth-section').style.display = 'grid';
    document.getElementById('dashboard').style.display = 'none';
    
    // Clear forms
    document.getElementById('register-form').reset();
    document.getElementById('login-form').reset();
    
    this.showAlert('Logged out successfully', 'info');
  }

  // Switch dashboard tabs
  switchTab(tabName) {
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(`${tabName}-tab`).classList.add('active');
  }

  // Load user projects
  async loadUserProjects() {
    try {
      const response = await fetch(`${this.apiBase}/projects`, {
        headers: { 'Authorization': `Bearer ${this.getAuthToken()}` }
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.projects) {
          for (const project of result.projects) {
            // Load project key and decrypt metadata
            await this.keyManager.loadProjectKey(project.projectId, project.encryptedProjectKey);
            const metadata = await this.keyManager.decryptProjectData(project.projectId, project.encryptedMetadata);
            
            this.projects.set(project.projectId, {
              ...project,
              metadata
            });
          }
          
          this.updateProjectsList();
          this.updateShareProjectOptions();
        }
      }
    } catch (error) {
      console.error('Failed to load projects:', error);
    }
  }

  // Update projects list display
  updateProjectsList() {
    const projectsList = document.getElementById('projects-list');
    projectsList.innerHTML = '';
    
    this.projects.forEach((project, projectId) => {
      const projectDiv = document.createElement('div');
      projectDiv.className = 'file-item';
      projectDiv.innerHTML = `
        <div class="file-info">
          <i class="fas fa-folder" style="color: #4c51bf;"></i>
          <div>
            <strong>${project.metadata.name}</strong>
            <div style="font-size: 0.8rem; color: #718096;">
              Created: ${new Date(project.metadata.created).toLocaleDateString()}
            </div>
          </div>
        </div>
        <div>
          <span class="file-status status-encrypted">Encrypted</span>
        </div>
      `;
      projectsList.appendChild(projectDiv);
    });
  }

  // Update share project options
  updateShareProjectOptions() {
    const shareSelect = document.getElementById('share-project');
    shareSelect.innerHTML = '<option value="">Select project to share</option>';
    
    this.projects.forEach((project, projectId) => {
      const option = document.createElement('option');
      option.value = projectId;
      option.textContent = project.metadata.name;
      shareSelect.appendChild(option);
    });
  }

  // Handle project creation
  async handleCreateProject() {
    const projectName = document.getElementById('project-name').value.trim();
    if (!projectName) {
      this.showAlert('Please enter a project name', 'error');
      return;
    }

    try {
      // Create project with encryption locally
      const projectData = await this.keyManager.createProject(projectName);
      
      // Send to server
      const response = await fetch(`${this.apiBase}/projects`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify({
          encryptedMetadata: projectData.encryptedMetadata,
          encryptedProjectKey: projectData.encryptedProjectKey
        })
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          // Add to local projects
          this.projects.set(result.data.projectId, {
            ...result.data,
            metadata: { name: projectName, created: new Date().toISOString(), owner: this.currentUser }
          });
          
          this.updateProjectsList();
          this.updateShareProjectOptions();
          document.getElementById('project-name').value = '';
          this.showAlert(`Project "${projectName}" created successfully!`, 'success');
        }
      } else {
        this.showAlert('Failed to create project', 'error');
      }
    } catch (error) {
      this.showAlert('Project creation failed: ' + error.message, 'error');
    }
  }

  // Handle file upload
  async handleFileUpload(fileList) {
    for (const file of fileList) {
      await this.encryptAndUploadFile(file);
    }
  }

  // Encrypt and upload file
  async encryptAndUploadFile(file) {
    const fileId = 'file_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    
    // Show processing status
    this.addFileToList(fileId, {
      name: file.name,
      size: file.size,
      status: 'processing'
    });

    try {
      // Generate unique key for this file
      const fileKey = await this.keyManager.crypto.generateSymmetricKey();
      
      // Encrypt file locally
      const encryptedFile = await this.keyManager.crypto.encryptFile(file, fileKey);
      
      // Encrypt file key with user's master key
      const encryptedFileKey = await this.keyManager.crypto.encryptKey(fileKey, this.keyManager.userKeys.masterKey);
      
      // Upload encrypted file
      const response = await fetch(`${this.apiBase}/files`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify({
          fileId,
          encryptedFile,
          encryptedFileKey,
          fileName: file.name,
          fileSize: file.size
        })
      });

      if (response.ok) {
        this.files.set(fileId, {
          name: file.name,
          size: file.size,
          encryptedFileKey,
          status: 'encrypted'
        });
        
        this.updateFileInList(fileId, { status: 'encrypted' });
        this.showAlert(`File "${file.name}" encrypted and uploaded successfully!`, 'success');
      } else {
        this.updateFileInList(fileId, { status: 'error' });
        this.showAlert(`Failed to upload "${file.name}"`, 'error');
      }
    } catch (error) {
      this.updateFileInList(fileId, { status: 'error' });
      this.showAlert(`Encryption failed for "${file.name}": ${error.message}`, 'error');
    }
  }

  // Add file to display list
  addFileToList(fileId, fileInfo) {
    const filesList = document.getElementById('files-list');
    const fileDiv = document.createElement('div');
    fileDiv.className = 'file-item';
    fileDiv.id = `file-${fileId}`;
    fileDiv.innerHTML = `
      <div class="file-info">
        <i class="fas fa-file" style="color: #4c51bf;"></i>
        <div>
          <strong>${fileInfo.name}</strong>
          <div style="font-size: 0.8rem; color: #718096;">
            ${this.formatFileSize(fileInfo.size)}
          </div>
        </div>
      </div>
      <div>
        <span class="file-status status-${fileInfo.status}">${this.getStatusText(fileInfo.status)}</span>
      </div>
    `;
    filesList.appendChild(fileDiv);
  }

  // Update file status in list
  updateFileInList(fileId, updates) {
    const fileDiv = document.getElementById(`file-${fileId}`);
    if (fileDiv && updates.status) {
      const statusSpan = fileDiv.querySelector('.file-status');
      statusSpan.className = `file-status status-${updates.status}`;
      statusSpan.textContent = this.getStatusText(updates.status);
    }
  }

  // Handle test creation
  async handleCreateTest() {
    const testName = document.getElementById('test-name').value.trim();
    const testType = document.getElementById('test-type').value;
    
    if (!testName) {
      this.showAlert('Please enter a test name', 'error');
      return;
    }

    try {
      // Create test data locally
      const testData = {
        name: testName,
        type: testType,
        created: new Date().toISOString(),
        content: `Test: ${testName}\nType: ${testType}\nCreated: ${new Date().toISOString()}`
      };

      // Encrypt test data
      const encryptedTestData = await this.keyManager.crypto.encryptData(testData, this.keyManager.userKeys.masterKey);
      
      // Send to server
      const response = await fetch(`${this.apiBase}/tests`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAuthToken()}`
        },
        body: JSON.stringify({
          encryptedTestData,
          testType
        })
      });

      if (response.ok) {
        document.getElementById('test-name').value = '';
        this.showAlert(`Test "${testName}" created and encrypted successfully!`, 'success');
        this.loadUserTests();
      } else {
        this.showAlert('Failed to create test', 'error');
      }
    } catch (error) {
      this.showAlert('Test creation failed: ' + error.message, 'error');
    }
  }

  // Load user tests
  async loadUserTests() {
    // Implementation for loading tests would go here
    // Similar to loadUserProjects but for tests
  }

  // Handle sharing
  async handleShare() {
    const email = document.getElementById('share-email').value.trim();
    const projectId = document.getElementById('share-project').value;
    
    if (!email || !projectId) {
      this.showAlert('Please enter recipient email and select a project', 'error');
      return;
    }

    this.showAlert('Sharing functionality requires additional cryptographic implementation for secure key exchange', 'info');
  }

  // Utility methods
  getAuthToken() {
    // In a real implementation, this would return a JWT token
    // For now, we'll simulate with user email
    return btoa(this.currentUser || 'anonymous');
  }

  formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  getStatusText(status) {
    const statusTexts = {
      processing: 'Encrypting...',
      encrypted: 'Encrypted',
      error: 'Error'
    };
    return statusTexts[status] || status;
  }

  showAlert(message, type) {
    const alertArea = document.getElementById('alert-area');
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.innerHTML = `
      <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
      ${message}
    `;
    
    alertArea.innerHTML = '';
    alertArea.appendChild(alertDiv);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (alertDiv.parentNode) {
        alertDiv.parentNode.removeChild(alertDiv);
      }
    }, 5000);
  }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  new TestBedApp();
}); 