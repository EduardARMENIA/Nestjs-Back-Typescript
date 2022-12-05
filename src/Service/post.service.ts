import { Posts, PostsDocument } from '.././Schema/Post';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()

export class AppService {
  @InjectModel(Posts.name) private model: Model< PostsDocument>;

  create(name: Posts) {
    return this.model.create(name);
  }

  find() {
    return this.model.find();
  }

  findOne(item:any) {
    return this.model.findOne(item)
  }

  update(id: string, data: any) {
    return this.model.findByIdAndUpdate(id, data, { new: true });
  }

  finds(item:any) {
    return this.model.find(item)
  }
    
}



