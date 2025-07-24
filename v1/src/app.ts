import express from 'express';
import cors from 'cors';
import path from 'path';
import { connectDB } from './infrastructure/db';
import { authenticateToken } from './shared/auth.middleware';

// Auth controllers
import { register, login } from './interfaces/auth.controller';

// Project controllers
import { 
  createProject, 
  getProjects, 
  getProject, 
  deleteProject 
} from './interfaces/project.controller';

// File controllers
import { 
  uploadFile, 
  getFiles, 
  getProjectFiles, 
  getFile, 
  deleteFile 
} from './interfaces/file.controller';

const app = express();

// Middleware
app.use(express.json({ limit: '50mb' })); // Large limit for encrypted files
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors({
  origin: ['http://localhost:3000', 'https://msehgal001.github.io'], // Frontend URLs
  credentials: true
}));

// Serve static frontend files
app.use(express.static(path.join(__dirname, '..')));

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Authentication routes (no auth required)
app.post('/auth/register', register);
app.post('/auth/login', login);

// Project routes (auth required)
app.post('/projects', authenticateToken, createProject);
app.get('/projects', authenticateToken, getProjects);
app.get('/projects/:projectId', authenticateToken, getProject);
app.delete('/projects/:projectId', authenticateToken, deleteProject);

// File routes (auth required)
app.post('/files', authenticateToken, uploadFile);
app.get('/files', authenticateToken, getFiles);
app.get('/projects/:projectId/files', authenticateToken, getProjectFiles);
app.get('/files/:fileId', authenticateToken, getFile);
app.delete('/files/:fileId', authenticateToken, deleteFile);

// Error handling middleware
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Error:', err.message);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// 404 handler
app.use((_req: express.Request, res: express.Response) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

// Start server
const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Zero-Knowledge Backend running on port ${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/health`);
      console.log(`Frontend: http://localhost:${PORT}/index.html`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
})(); 