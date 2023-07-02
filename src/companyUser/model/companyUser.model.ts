import { Schema } from 'mongoose';

export const CompanyUserSchema = new Schema({
  role: { type: String, enum: ['Admin', 'Employee', 'HR'] },
  company: { type: Schema.Types.ObjectId, ref: 'Company' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  date: { type: Number, required: true },
});

export interface CompanyUser {
  id: string;
  role: string;
  user;
  company;
  date: number;
}
