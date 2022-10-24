import { Schema } from 'mongoose';

export const UserCompanySchema = new Schema({
  company: { type: Schema.Types.ObjectId, ref: 'Company', default: null },
  user: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  role: { type: String, enum: ['Admin', 'Manager', 'HR', 'Employee'] },
  joinDate:Date
});

export interface UserCompany {
  id: string;
  company;
  user;
  role: Number;
  joinDate:Date;
}
