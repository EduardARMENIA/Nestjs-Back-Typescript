import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CommentController} from '../Controlers/commnet.controller';
import {CommentService} from '../Services/comment.service';
import {JwtModule} from "@nestjs/jwt";
import { ConfigModule } from '@nestjs/config';
import { Posts, PostSchema } from '../schemas/Post';
import { Comment, CommentSchema } from '../schemas/Comment';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        ConfigModule.forRoot({envFilePath: '.env',}),
        JwtModule.register({
            secret: process.env.SECRET_KEY,
            signOptions: {expiresIn: '1d'}
        }),
        MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    ],
    controllers: [],
    providers: [],
})
export class CommentModule {
}
