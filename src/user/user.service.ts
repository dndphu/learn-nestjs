import { Injectable } from '@nestjs/common';
import { IUser } from './user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {}

  async getAll(): Promise<IUser[] | undefined> {
    return this.userModel.find().select('-password');
  }
  findOne(username: string) {
    return this.userModel.findOne({ username }).exec();
  }
}
