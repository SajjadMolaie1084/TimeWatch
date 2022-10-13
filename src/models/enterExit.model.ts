import { Schema } from 'mongoose';

export const EnterExitSchema = new Schema({
  company: { type: Schema.Types.ObjectId, ref: 'Company' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, enum: ['Enter', 'Exit'] },
  date: Number,
});

export interface EnterExit {
  id: String;
  company;
  user;
  type: string;
  date: number;
}
