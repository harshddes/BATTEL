import { Response } from 'express';
import { TestService } from '../core/test.service';
import { TestRepository } from '../infrastructure/test.repository';
import { TestCreateRequest } from '../shared/test.types';
import { AuthRequest } from '../shared/types/express.types';

const testRepo = new TestRepository();
const testService = new TestService(testRepo);

export const createTest = async (req: AuthRequest, res: Response) => {
  try {
    const testData: TestCreateRequest = req.body;
    
    if (!testData.encryptedTestData || !testData.testType) {
      return res.status(400).json({
        success: false,
        error: 'Missing encrypted test data or test type'
      });
    }

    const test = await testService.createTest(req.user!.id, testData);
    
    res.status(201).json({
      success: true,
      data: test
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `Test creation failed: ${(error as Error).message}`
    });
  }
};

export const getTest = async (req: AuthRequest, res: Response) => {
  try {
    const { testId } = req.params;
    const test = await testService.getTest(testId, req.user!.id);
    
    if (!test) {
      return res.status(404).json({
        success: false,
        error: 'Test not found'
      });
    }
    
    res.json({
      success: true,
      data: test
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `Failed to retrieve test: ${(error as Error).message}`
    });
  }
};

export const getUserTests = async (req: AuthRequest, res: Response) => {
  try {
    const tests = await testService.getUserTests(req.user!.id);
    
    res.json({
      success: true,
      tests
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `Failed to retrieve tests: ${(error as Error).message}`
    });
  }
}; 