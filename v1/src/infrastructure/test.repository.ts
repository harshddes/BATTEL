import { Test } from '../shared/test.types';
import { TestModel } from './test.model';

export class TestRepository {
  async save(test: Test): Promise<Test> {
    const newTest = new TestModel(test);
    const saved = await newTest.save();
    return saved.toObject();
  }

  async findByTestIdAndUser(testId: string, userId: string): Promise<Test | null> {
    const test = await TestModel.findOne({ testId, userId });
    return test ? test.toObject() : null;
  }

  async findByUserId(userId: string): Promise<Test[]> {
    const tests = await TestModel.find({ userId });
    return tests.map(t => t.toObject());
  }

  async findByProjectId(projectId: string): Promise<Test[]> {
    const tests = await TestModel.find({ projectId });
    return tests.map(t => t.toObject());
  }

  async deleteByTestId(testId: string, userId: string): Promise<boolean> {
    const result = await TestModel.deleteOne({ testId, userId });
    return result.deletedCount > 0;
  }
} 