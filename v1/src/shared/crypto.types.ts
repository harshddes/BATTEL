export interface EncryptedData {
  encrypted: number[];
  iv: number[];
}

export interface EncryptedFile {
  chunks: EncryptedFileChunk[];
  totalSize: number;
  fileName: string;
  fileType: string;
}

export interface EncryptedFileChunk {
  encrypted: number[];
  iv: number[];
  index: number;
}

export interface UserCryptoData {
  email: string;
  salt: number[];
  encryptedPrivateKey: EncryptedData;
  publicKey: number[];
}

export interface ProjectData {
  projectId: string;
  encryptedMetadata: EncryptedData;
  encryptedProjectKey: EncryptedData;
  userId: string;
  createdAt: Date;
}

export interface FileData {
  fileId: string;
  userId: string;
  projectId?: string;
  encryptedFile: EncryptedFile;
  encryptedFileKey: EncryptedData;
  fileName: string;
  fileSize: number;
  createdAt: Date;
}

export interface ShareData {
  shareId: string;
  fromUserId: string;
  toUserId: string;
  projectId?: string;
  fileId?: string;
  encryptedData: EncryptedData;
  shareType: 'project' | 'file';
  createdAt: Date;
} 