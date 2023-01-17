import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import mongoose from 'mongoose';

export type LikeDocument = Like & Document;

@Schema({ timestamps: true })
export class Like {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  like: string;

  @Prop({ required: true, ref: 'Posts' })
  post: mongoose.Schema.Types.ObjectId;
}

export const LikeSchema = SchemaFactory.createForClass(Like);
