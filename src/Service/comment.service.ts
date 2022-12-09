import { Comment, CommentDocument } from '.././Schema/comment.schema';
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
}
