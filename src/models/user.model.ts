import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  phoneNumber: { type: String, require: true, unique: true },
  otp: { type: Number, require: true },
  confirmOtp: { type: Boolean, default: false },
});

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  otp: number;
  confirmOtp: boolean;
}
