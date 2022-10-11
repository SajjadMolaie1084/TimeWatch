import { Schema } from 'mongoose';

export const InviteSchema = new Schema({
  company: { type: Schema.Types.ObjectId, ref: 'Company' },
  user: String,
  status: { type: String, enum: ['pending', 'accept'], default: 'pending' },
  link: { type: String },
});

export interface Invite {
  id: string;
  company;
  user: string;
  status: string;
  link: string;
}
