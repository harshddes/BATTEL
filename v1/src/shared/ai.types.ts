import { EncryptedData } from './crypto.types';

export interface AIProcessingRequest {
  dataId: string;
  modelType: 'text-analysis' | 'image-classification' | 'data-insights';
  processingMethod: 'homomorphic' | 'tee' | 'federated' | 'local';
  encryptedData: EncryptedData;
  parameters?: Record<string, unknown>;
}

export interface AIProcessingResult {
  requestId: string;
  encryptedResults: EncryptedData;
  metadata: {
    processingTime: number;
    modelVersion: string;
    privacyLevel: 'zero-knowledge' | 'differential-private' | 'federated';
  };
}

export interface HomomorphicComputation {
  operation: 'sum' | 'mean' | 'classification' | 'regression';
  encryptedInputs: EncryptedData[];
  publicKey: number[];
}

export interface TEERequest {
  enclaveId: string;
  encryptedPayload: EncryptedData;
  attestationKey: number[];
}

export interface FederatedLearningUpdate {
  modelGradients: EncryptedData;
  participantId: string;
  privacyBudget: number;
}

export interface ZKMLProof {
  computationProof: number[];
  publicInputs: number[];
  verificationKey: number[];
} 