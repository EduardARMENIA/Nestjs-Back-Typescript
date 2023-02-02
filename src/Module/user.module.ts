import { Module } from '@nestjs/common';
import { RegisterController } from '../Controller/register.controller';
import { LoginController } from '../Controller/login.controller';
import { UsersController } from '../Controller/users.controller';
import { ChangeController } from '../Controller/change.controller';
import { ProfileController } from '../Controller/profile.controller';
import { UserService } from '../Service/user.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { User, UserSchema } from '../Schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { PostService } from '../Service/post.service';
import { Posts, PostSchema } from '../Schema/post.schema';
import { CommentService } from '../Service/comment.service';
import { Comment, CommentSchema } from '../Schema/comment.schema';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '1d' },
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Posts.name, schema: PostSchema }]),
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
  ],
  controllers: [
    RegisterController,
    LoginController,
    UsersController,
    ChangeController,
    ProfileController,
  ],
  providers: [UserService, PostService, CommentService],
})
export class UserModule {}


