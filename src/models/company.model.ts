import { Schema } from 'mongoose';

export const CompanySchema = new Schema({
  name: String,
  phoneNumber: String,
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
});

export interface Company {
  id: string;
  name: string;
  phoneNumber: string;
  owner;
}
