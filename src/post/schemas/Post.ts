import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import mongoose from 'mongoose';

export type PostsDocument = Posts & Document;

@Schema({ timestamps: true })
export class Posts {
  @Prop({ required: false })
  author:string;

  @Prop({ required: false })
  img: [{
    type:string
  }]
  
  @Prop({ required: false })
  title:string;

  @Prop({ required: false })
  content: string;

  @Prop({ required: false})
  comments: [{
    type: mongoose.Schema.Types.ObjectId;
    ref: 'Comment';
    default: undefined
  }]


  

}

export const PostSchema = SchemaFactory.createForClass(Posts);
