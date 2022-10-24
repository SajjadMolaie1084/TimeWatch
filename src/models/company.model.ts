import { Schema } from 'mongoose';

export const CompanySchema = new Schema({
  name: String,
  phoneNumber: String,
});

export interface Company {
  id: string;
  name: string;
  phoneNumber: string;
}
