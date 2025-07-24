import { Schema, model } from 'mongoose';
import { User } from '../shared/user.types';

const encryptedDataSchema = new Schema({
  encrypted: [Number],
  iv: [Number]
}, { _id: false });

const userSchema = new Schema<User>({
  email: { type: String, required: true, unique: true },
  salt: { type: [Number], required: true },
  encryptedPrivateKey: { type: encryptedDataSchema, required: true },
  publicKey: { type: [Number], required: true },
  createdAt: { type: Date, default: Date.now },
});

export const UserModel = model<User>('User', userSchema); 