import { Module } from '@nestjs/common';
import { UserModule } from './Module/user.module';
import { PostModule } from './Module/post.module';
import { LikeModule } from './Module/like.module';
import { ChatModule } from './Module/chat.module';
import { MessagesModule } from './Module/messages.module';
import { CommentModule } from './Module/comment.module';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/social-insta-111112wws1qw'),
    UserModule,
    PostModule,
    CommentModule,
    LikeModule,
    ChatModule,
    MessagesModule
  ],
})
export class AppModule {}
