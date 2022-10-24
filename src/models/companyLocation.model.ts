import { Schema } from 'mongoose';

export const CompanyLocationSchema = new Schema({
  lat: Number,
  long: Number,
  radius: Number,
  name: String,
  company: { type: Schema.Types.ObjectId, ref: 'Company' },
});

export interface CompanyLocation {
  id: string;
  lat: Number;
  long: Number;
  radius: Number;
  company;
}
