import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import mongoose from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema({ timestamps: true })
export class Comment {
  @Prop({ required: true })
  author_id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  author: string;

  @Prop({ required: false })
  author_img: [
    {
      type: string;
    },
  ]

  @Prop({ required: true })
  content: string;

  @Prop({ required: false, ref: 'Posts' })
  post: mongoose.Schema.Types.ObjectId;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
