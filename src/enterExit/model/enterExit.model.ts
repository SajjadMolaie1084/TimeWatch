import { Schema } from 'mongoose';

export const EnterExitSchema = new Schema({
  company: { type: Schema.Types.ObjectId, ref: 'Company' },
  location: { type: Schema.Types.ObjectId, ref: 'CompanyLocation' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, enum: ['Enter', 'Exit'] },
  date: Number,
  firstName:  { type: String},
  lastName:  { type: String }
});

export interface EnterExit {
  id: String;
  company;
  location;
  user;
  type: string;
  date: number;
}
