import { FileData } from '../shared/crypto.types';
// import { FileModel } from './file.model';

// In-memory storage for demo
const files: Map<string, FileData> = new Map();

export class FileRepository {
  async save(fileData: FileData): Promise<FileData> {
    files.set(fileData.fileId, fileData);
    console.log(`Demo: File uploaded - ${fileData.fileName} (${fileData.fileSize} bytes)`);
    return fileData;
  }

  async findByUserId(userId: string): Promise<FileData[]> {
    return Array.from(files.values()).filter(f => f.userId === userId);
  }

  async findByProjectId(projectId: string): Promise<FileData[]> {
    return Array.from(files.values()).filter(f => f.projectId === projectId);
  }

  async findByFileId(fileId: string): Promise<FileData | null> {
    return files.get(fileId) || null;
  }

  async findByFileIdAndUser(fileId: string, userId: string): Promise<FileData | null> {
    const file = files.get(fileId);
    return (file && file.userId === userId) ? file : null;
  }

  async deleteByFileId(fileId: string, userId: string): Promise<boolean> {
    const file = files.get(fileId);
    if (file && file.userId === userId) {
      files.delete(fileId);
      console.log(`Demo: File deleted - ${fileId}`);
      return true;
    }
    return false;
  }
} 