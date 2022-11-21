import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PostController} from '../Controlers/post.controller';
import {CommentController} from '../Controlers/commnet.controller';
import {AppService} from '../Services/post.service';
import {CommentService} from '../Services/comment.service';
import {JwtModule} from "@nestjs/jwt";
import { ConfigModule } from '@nestjs/config';
import { Posts, PostSchema } from '../schemas/Post';
import { Comment, CommentSchema } from '../schemas/Comment';
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
