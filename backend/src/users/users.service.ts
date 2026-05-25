import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) { }

  async createUser(data: any) {
    const newUser = new this.userModel(data);
    return newUser.save();
  }
  async findByUsername(username: string) {
    return this.userModel.findOne({ username });
  }
  async findById(id: string) {
    return this.userModel.findById(id);
  }
  async deleteUser(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
  async updateUser(id: string, data: any) {
    return this.userModel.findByIdAndUpdate(id, data, { new: true });
  }

  async getUsers() {
    return this.userModel.find();
  }
}
