import {Module} from '@nestjs/common';
import {PostController} from '.././Controller/post.controller';
import {CommentController} from '.././Controller/commnet.controller';
import {AppService} from '.././Service/post.service';
import {CommentService} from '.././Service/comment.service';
import {JwtModule} from "@nestjs/jwt";
import { ConfigModule } from '@nestjs/config';
import { Posts, PostSchema } from '.././Schema/Post';
import { Comment, CommentSchema } from '.././Schema/Comment';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';

@Module({
    imports: [
        ConfigModule.forRoot({envFilePath: '.env',}),
        JwtModule.register({
            secret: process.env.SECRET_KEY,
            signOptions: {expiresIn: '1d'}
        }),
        MongooseModule.forFeature([{ name: Posts.name, schema: PostSchema }]),
        MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
        MulterModule.register({dest: './files',}),
    ],
    controllers: [PostController, CommentController],
    providers: [AppService, CommentService],
})
export class PostModule {
}
