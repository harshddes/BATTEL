import { EncryptedData } from './crypto.types';

export interface User {
  id: string;
  email: string;
  salt: number[];
  encryptedPrivateKey: EncryptedData;
  publicKey: number[];
  createdAt: Date;
}

export interface UserRegistrationInput {
  email: string;
  salt: number[];
  encryptedPrivateKey: EncryptedData;
  publicKey: number[];
}

export interface UserLoginInput {
  email: string;
  password: string; // Placeholder - not actually used in zero-knowledge auth
}

export interface UserAuthResponse {
  success: boolean;
  userData?: {
    salt: number[];
    encryptedPrivateKey: EncryptedData;
    publicKey: number[];
  };
  message?: string;
} 