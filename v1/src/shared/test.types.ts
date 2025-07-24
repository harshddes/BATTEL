import { EncryptedData } from './crypto.types';

export interface Test {
  id: string;
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