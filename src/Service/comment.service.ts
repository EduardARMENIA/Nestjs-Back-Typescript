import { Comment, CommentDocument } from '../Schema/comment.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class CommentService {
  @InjectModel(Comment.name) private model: Model<CommentDocument>;

  create(name: Comment) {
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

  updateByName(id: any, data: any) {
    return this.model.updateMany(id, data, { new: true });
  }

  finds(item: any) {
    return this.model.find(item);
  }

  delate(item: any) {
    return this.model.findOneAndRemove(item);
  }
}
