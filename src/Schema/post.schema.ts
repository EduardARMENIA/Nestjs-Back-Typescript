import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import mongoose from 'mongoose';

export type PostsDocument = Posts & Document;

@Schema({ timestamps: true })
export class Posts {
  @Prop({ required: false })
  author_id: [
    {
      type: mongoose.Schema.Types.ObjectId;
    },
  ];

  @Prop({ required: false })
  author: string;

  @Prop({ required: false })
  img: [
    {
      type: string;
    },
  ];

  @Prop({ required: false })
  title: string;

  @Prop({ required: false })
  content: string;

  @Prop({ required: false })
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId;
      ref: 'Comment';
      default: undefined;
    },
  ];

  @Prop({ required: false })
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId;
      ref: 'Like';
      default: undefined;
    },
  ];
}

export const PostSchema = SchemaFactory.createForClass(Posts);
