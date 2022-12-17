import { Schema } from 'mongoose';

export const NewsSchema = new Schema({
  text: { type: String, require: true },
  company: { type: Schema.Types.ObjectId, ref: 'Company' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  targetUser: { type: Schema.Types.ObjectId, ref: 'User',require:false },
  date: Number
});

export interface News {
  text: string;
  company;
  user;
  targetUser;
  date: Number;
}
