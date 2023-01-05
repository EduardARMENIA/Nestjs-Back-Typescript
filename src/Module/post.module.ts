import { Module } from '@nestjs/common';
import { PostController } from '../Controller/post.controller';
import { CommentController } from '../Controller/commnet.controller';
import { PostService } from '../Service/post.service';
import { CommentService } from '../Service/comment.service';
import { LikeService } from '../Service/like.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { Posts, PostSchema } from '../Schema/post.schema';
import { Like, LikeSchema } from '../Schema/like.schema';
import { Comment, CommentSchema } from '../Schema/comment.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { UserService } from '../Service/user.service';
import { User, UserSchema } from '../Schema/user.schema';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '1d' },
    }),
    MongooseModule.forFeature([{ name: Posts.name, schema: PostSchema }]),
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    MongooseModule.forFeature([{ name: Like.name, schema: LikeSchema }]),
     MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MulterModule.register({ dest: './files' }),
  ],
  controllers: [PostController, CommentController],
  providers: [PostService, CommentService, LikeService, UserService],
})
export class PostModule {}
