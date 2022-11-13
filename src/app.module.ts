import {Module} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { PostModule } from './post/Modules/post.module';
import { CommentModule } from './post/Modules/comment.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
   imports: [
    MongooseModule.forRoot('mongodb://localhost/social-media1012'),
    UserModule,
    PostModule,
    CommentModule
  ],

})
export class AppModule {
}
