import { Schema } from 'mongoose';

export const VersionSchema = new Schema({
  name: String,
  filepath: String,
  filename: String,

});

export interface Version {
  id: string;
  name: string;
  filepath: string;
  filename: String;

}
