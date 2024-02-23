// import * as mongoose from 'mongoose';
import { Types, Schema, model } from 'mongoose';

export interface IUser {
  _id: Types.ObjectId;
  username: string;
  password: string;
  email?: string;
  avatar?: string;
  _doc: any;
}

export const UserSchema = new Schema(
  {
    username: {
      type: String,
      require: [true, 'Please enter username!'],
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please enter a password!'],
      minLength: 6,
    },
    avatar: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      require: [true, 'Please enter an email!'],
      unique: true,
      lowercase: true,
    },
  },
  { timestamps: true },
);

export const User = model<IUser>('User', UserSchema);
