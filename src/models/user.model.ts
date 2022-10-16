import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  phoneNumber: { type: String, require: true, unique: true },
  company: { type: Schema.Types.ObjectId, ref: 'Company', default: null },
  otp: { type: Number, require: true },
  confirmOtp: { type: Boolean, default: false },
});

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  company;
  otp: number;
  confirmOtp: boolean;
  fcm:string;
}
