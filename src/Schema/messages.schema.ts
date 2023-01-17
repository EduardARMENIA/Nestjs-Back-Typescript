import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MessagesDocument = Messages & Document;

@Schema({ timestamps: true })
export class Messages {
  @Prop({ required: true })
  room: string;

  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  text: string;
}

export const MessagesSchema = SchemaFactory.createForClass(Messages);
