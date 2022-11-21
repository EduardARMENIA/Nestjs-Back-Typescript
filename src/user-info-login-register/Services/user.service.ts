import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

import { User, UserDocument } from '../schemas/user.schema';
import { Posts, PostsDocument } from '../schemas/Post';

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

  findOne(item:any) {
    return this.model.findOne(item);
  }

  update(id: string, data: any) {
    return this.model.findByIdAndUpdate(id, data, { new: true });
  }
    
}



