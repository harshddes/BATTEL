import { Schema, model } from 'mongoose';
import { ProjectData } from '../shared/crypto.types';

const encryptedDataSchema = new Schema({
  encrypted: [Number],
  iv: [Number]
}, { _id: false });

const projectSchema = new Schema<ProjectData>({
  projectId: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  encryptedMetadata: { type: encryptedDataSchema, required: true },
  encryptedProjectKey: { type: encryptedDataSchema, required: true },
  createdAt: { type: Date, default: Date.now },
});

projectSchema.index({ userId: 1 });
projectSchema.index({ projectId: 1 });

export const ProjectModel = model<ProjectData>('Project', projectSchema); 