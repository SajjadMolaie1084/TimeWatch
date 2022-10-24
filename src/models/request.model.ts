import { Schema } from 'mongoose';

export const RequestSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  company: { type: Schema.Types.ObjectId, ref: 'Company' },
  start:Date,
  end:Date,
  status: { type: String, enum: ['Pending', 'Accept','Reject'], default: 'Pending'},
  type: { type: String, enum: ['Vacation', 'Enter','Exit','Mission'] },
});

export interface Request {
  id: string;
  user;
  company;
  start:Date;
  end:Date;
  status: String;
  type: String;
}
