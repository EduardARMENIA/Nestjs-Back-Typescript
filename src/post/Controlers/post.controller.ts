import {BadRequestException, Body, Controller, Get, Post, Req, Res, UnauthorizedException, Param, UseInterceptors, UploadedFile} from '@nestjs/common';
import {AppService} from '../Services/post.service';
import {CommentService} from '../Services/comment.service';
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";
import {Response, Request} from 'express';
import { Posts } from '../schemas/post';
import { Comment } from '../schemas/Comment';
import { CreateCatDto } from '../dto/create-user.dto';
import { LoginCatDto } from '../dto/login-user.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from '../utils/file-upload.utils';



@Controller('api')
export class PostController {
    constructor(
        private readonly appService: AppService,
        private jwtService: JwtService
    ) {
    }

    @Get('post')
    async postId(@Res() res: Response, @Req() req: Request)  {
     try {
        const post = await this.appService.find().populate([{path:'comments',  model:'Comment',}]);
        res.send(post)
     } catch (error) {
        return 'error';
     }
   }
   
    @Post('post')
    async register(
        @Body() title: Posts,
        @Res() res: Response,
        @Req() req: Request
    ) {

        const users = await this.appService.create(
            title,
        );
        console.log(users)


       res.json({ message: 'success' });
    }

    @Post('post_image')
    @UseInterceptors(
     FileInterceptor('image', {
       storage: diskStorage({
         destination: './files',
         filename: editFileName,
       }),
       fileFilter: imageFileFilter,
     }),
    )
    async uploadedFile(@Body() body: any, @UploadedFile() file, @Res() res: Response, @Req() req: Request) {
     let x = file.filename
     const cookie = req.cookies['jwt'];

     const data = await this.jwtService.verifyAsync(cookie);

     console.log(data['name'])
     const users = await this.appService.create({author: data['name'],img:file.filename, title:body.title, content:body.content, comments:undefined});
     return ({ message: 'success' });
  }

   

  @Get('/:id/post_image')
  seeUploadedFile(@Param('id') image, @Res() res) {
    return res.sendFile(image, { root: './files' });
  }
  
  @Get('/:name/porfile_post')
  async Porfile_posts(@Param('name') name, @Res() res) {
    const post = await this.appService.finds({author:name}).populate([{path:'comments',  model:'Comment',}]);
    console.log(post)
    res.send(post)
  }
}


