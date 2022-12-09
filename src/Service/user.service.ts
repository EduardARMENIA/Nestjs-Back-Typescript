import { User, UserDocument } from '.././Schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  @InjectModel(User.name) private model: Model<UserDocument>;

  create(name: User) {
    return this.model.create(name);
  }

  find() {
    return this.model.find();
  }

  findOne(item: any) {
    return this.model.findOne(item);
  }

  update(id: string, data: any) {
    return this.model.findByIdAndUpdate(id, data, { new: true });
  }
}
