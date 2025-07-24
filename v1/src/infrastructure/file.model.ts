import { Schema, model } from 'mongoose';
import { FileData } from '../shared/crypto.types';

const encryptedDataSchema = new Schema({
  encrypted: [Number],
  iv: [Number]
}, { _id: false });

const encryptedFileChunkSchema = new Schema({
  encrypted: [Number],
  iv: [Number],
  index: Number
}, { _id: false });

const encryptedFileSchema = new Schema({
  chunks: [encryptedFileChunkSchema],
  totalSize: Number,
  fileName: String,
  fileType: String
}, { _id: false });

const fileSchema = new Schema<FileData>({
  fileId: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  projectId: { type: String },
  encryptedFile: { type: encryptedFileSchema, required: true },
  encryptedFileKey: { type: encryptedDataSchema, required: true },
  fileName: { type: String, required: true },
  fileSize: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

fileSchema.index({ userId: 1 });
fileSchema.index({ projectId: 1 });
fileSchema.index({ fileId: 1 });

export const FileModel = model<FileData>('File', fileSchema); 