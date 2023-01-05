import { Like, LikeDocument } from '../Schema/like.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class LikeService {
  @InjectModel(Like.name) private model: Model<LikeDocument>;

  create(name: Like) {
    return this.model.create(name);
  }

  find() {
    return this.model.find();
  }

  findOne(item: any) {
    return this.model.findOne(item);
  }
}
