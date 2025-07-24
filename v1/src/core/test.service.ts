import { Test, TestCreateRequest } from '../shared/test.types';
import { TestRepository } from '../infrastructure/test.repository';

export class TestService {
  private testRepo: TestRepository;

  constructor(testRepo: TestRepository) {
    this.testRepo = testRepo;
  }

  async createTest(userId: string, request: TestCreateRequest): Promise<Test> {
    const testId = 'test_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    
    const test: Test = {
      id: '',
      testId,
      userId,
      projectId: request.projectId,
      encryptedTestData: request.encryptedTestData,
      testType: request.testType,
      createdAt: new Date(),
    };
    
    return this.testRepo.save(test);
  }

  async getTest(testId: string, userId: string): Promise<Test | null> {
    return this.testRepo.findByTestIdAndUser(testId, userId);
  }

  async getUserTests(userId: string): Promise<Test[]> {
    return this.testRepo.findByUserId(userId);
  }
} 