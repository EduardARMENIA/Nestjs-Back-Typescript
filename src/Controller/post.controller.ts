import {BadRequestException, Body, Controller, Get, Post, Req, Res, UnauthorizedException, Param, UseInterceptors, UploadedFile, Headers} from '@nestjs/common';
import {AppService} from '.././Service/post.service';
import {JwtService} from "@nestjs/jwt";
import {Response, Request} from 'express';
import { Posts } from '.././Schema/post';
import { Comment } from '.././Schema/Comment';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from '.././utils/file-upload.utils';



@Controller('api')
export class PostController {
    constructor(
        private readonly appService: AppService,
        private jwtService: JwtService
    ) {
    }

    @Get('post')
    async postId(@Res() res: Response, @Req() req: Request, @Headers() headers)  {
     try {
        const post = await this.appService.find().populate([{path:'comments',  model:'Comment',}]);
        res.send(post)
        console.log(post)
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
    async uploadedFile(@Body() body: any, @UploadedFile() file, @Res() res: Response, @Req() req: Request,  @Headers() headers) {
       console.log(file.filename) 
       let jwts = headers.authorization;
       const cookie = jwts;
       const data = await this.jwtService.verifyAsync(cookie); 
       console.log(data['name'])     
       const users = await this.appService.create({author: data['name'],img:file.filename, title:body.title, content:body.content, comments:undefined, likes:undefined});
       return ({ message: 'success' });
  }

   

  @Get('/:id/post_image')
  seeUploadedFile(@Param('id') image, @Res() res) {
    return res.sendFile(image, { root: './files' });
  }
  
  @Get('/:name/porfile_post')
  async Porfile_posts(@Param('name') name, @Res() res) {
    const post = await this.appService.finds({author:name}).populate([{path:'comments',  model:'Comment',}]);
    res.send(post)
  }

}

