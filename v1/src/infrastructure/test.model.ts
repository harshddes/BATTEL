import { Schema, model } from 'mongoose';
import { Test } from '../shared/test.types';

const encryptedDataSchema = new Schema({
  encrypted: [Number],
  iv: [Number]
}, { _id: false });

const testSchema = new Schema<Test>({
  testId: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  projectId: { type: String },
  encryptedTestData: { type: encryptedDataSchema, required: true },
  testType: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

testSchema.index({ userId: 1 });
testSchema.index({ testId: 1 });
testSchema.index({ projectId: 1 });

export const TestModel = model<Test>('Test', testSchema); 