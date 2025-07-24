import { FileData } from '../shared/crypto.types';
import { FileUploadRequest, FileResponse } from '../shared/api.types';
import { FileRepository } from '../infrastructure/file.repository';

export class FileService {
  private fileRepo: FileRepository;

  constructor(fileRepo: FileRepository) {
    this.fileRepo = fileRepo;
  }

  async uploadFile(userId: string, request: FileUploadRequest): Promise<FileData> {
    const fileData: FileData = {
      fileId: request.fileId,
      userId,
      projectId: request.projectId,
      encryptedFile: request.encryptedFile,
      encryptedFileKey: request.encryptedFileKey,
      fileName: request.fileName,
      fileSize: request.fileSize,
      createdAt: new Date()
    };

    return this.fileRepo.save(fileData);
  }

  async getUserFiles(userId: string): Promise<FileResponse> {
    const files = await this.fileRepo.findByUserId(userId);
    return { files };
  }

  async getProjectFiles(projectId: string): Promise<FileResponse> {
    const files = await this.fileRepo.findByProjectId(projectId);
    return { files };
  }

  async getFile(fileId: string, userId: string): Promise<FileData | null> {
    return this.fileRepo.findByFileIdAndUser(fileId, userId);
  }

  async deleteFile(fileId: string, userId: string): Promise<boolean> {
    return this.fileRepo.deleteByFileId(fileId, userId);
  }
} 