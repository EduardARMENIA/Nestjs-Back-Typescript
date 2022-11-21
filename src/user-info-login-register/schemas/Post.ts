

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import mongoose from 'mongoose';

export type PostsDocument = Posts & Document;

@Schema({ timestamps: true })
export class Posts {
  title: {
        type: String,
        required: true
  }

  content: {
        type: String,
        required: true
  }

}

export const PostSchema = SchemaFactory.createForClass(Posts);
