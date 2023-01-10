import { Messages, MessagesDocument } from '../Schema/messages.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';


@Injectable()
export class MessagesService {
  @InjectModel(Messages.name) private model: Model<MessagesDocument>;

  create(name: Messages) {
    return this.model.create(name);
  }

  find() {
    return this.model.find();
  }

  findOne(item: any) {
    return this.model.findOne(item);
  }

  finds(item: any) {
    return this.model.find(item);
  }
}
