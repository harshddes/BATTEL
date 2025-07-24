import { EncryptedData, EncryptedFile, ProjectData, FileData } from './crypto.types';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface ProjectCreateRequest {
  encryptedMetadata: EncryptedData;
  encryptedProjectKey: EncryptedData;
}

export interface ProjectResponse {
  projects: ProjectData[];
}

export interface FileUploadRequest {
  fileId: string;
  encryptedFile: EncryptedFile;
  encryptedFileKey: EncryptedData;
  fileName: string;
  fileSize: number;
  projectId?: string;
}

export interface FileResponse {
  files: FileData[];
}

export interface ShareRequest {
  targetEmail: string;
  projectId?: string;
  fileId?: string;
  encryptedData: EncryptedData;
  shareType: 'project' | 'file';
}

export interface TestData {
  testId: string;
  userId: string;
  projectId?: string;
  encryptedTestData: EncryptedData;
  testType: string;
  createdAt: Date;
}

export interface TestCreateRequest {
  encryptedTestData: EncryptedData;
  testType: string;
  projectId?: string;
} 