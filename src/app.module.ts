import {Module} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user-info-login-register/user.module';
import { PostModule } from './post-comment-like/Modules/post.module';
import { CommentModule } from './post-comment-like/Modules/comment.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
   imports: [
    MongooseModule.forRoot('mongodb://localhost/social-media-best'),
    UserModule,
    PostModule,
    CommentModule
  ],

})
export class AppModule {
}
