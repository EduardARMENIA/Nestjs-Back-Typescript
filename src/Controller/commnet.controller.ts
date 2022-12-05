import {BadRequestException, Body, Controller, Get, Post, Req, Res, UnauthorizedException, Param, Patch} from '@nestjs/common';
import {AppService} from '.././Service/post.service';
import {CommentService} from '.././Service/comment.service';
import {JwtService} from "@nestjs/jwt";
import {Response, Request} from 'express';
import { Comment } from '.././Schema/Comment';
import * as mongoose from 'mongoose';




@Controller('api')
export class CommentController {
    constructor(
        private readonly commentService: CommentService,
        private readonly appService: AppService,
        private jwtService: JwtService
    ) {
    }
    @Post('/:id/comment')
    async postcomm(@Param('id') id, @Body() content: any, @Res() res: Response, @Req() req: Request)  {
     try {
        console.log(content)
        const post = await this.appService.findOne({ _id: id })
        const create = await this.commentService.create({ content: content.content, post: post._id })
        const create2 = await this.appService.update(post._id,{ $push:  {comments: create._id}})
        res.json(create )

     } catch (error) {
        return 'error';
     }
   }
   
   @Get('/:id/comment')
   async postIds(@Param('id') id, @Body() content: any, @Res() res: Response, @Req() req: Request)  {
        const posts = await this.appService.findOne({ _id: id }).populate([{path:'comments',  model:'Comment',}]);
        res.send(posts)

   }
}


