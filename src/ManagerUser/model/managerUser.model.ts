import { Schema } from 'mongoose';

export const ManagerUserSchema = new Schema({
  manager: { type: Schema.Types.ObjectId, ref: 'User' },  
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

export interface ManagerUser {
  id: string;
  user;
  manager;
}
