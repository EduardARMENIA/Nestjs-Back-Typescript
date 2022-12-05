import {Module} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './Module/user.module';
import { PostModule } from './Module/post.module';
import { CommentModule } from './Module/comment.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
   imports: [
    MongooseModule.forRoot('mongodb://localhost/clone22'),
    UserModule,
    PostModule,
    CommentModule
  ],

})
export class AppModule {
}
