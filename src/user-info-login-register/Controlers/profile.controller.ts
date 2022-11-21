import {BadRequestException, Body, Controller, Get, Post, Req, Res, UnauthorizedException, Param, UseInterceptors, UploadedFile, Headers} from '@nestjs/common';
import {UserService} from '../Services/user.service';
import {JwtService} from "@nestjs/jwt";
import {Response, Request} from 'express';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from '../utils/file-upload.utils';




@Controller('api')
export class ProfileController {
    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService
    ) {
    }

  


@Post('/profile_image')
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
     console.log('tokeeneenenenene takk') 
     console.log(headers.authorization) 
     let jwts = headers.authorization;
     const cookie = jwts;
     const data = await this.jwtService.verifyAsync(cookie); 
     console.log(data['name'])     
     const profile_img = await this.userService.update(data['id'],{img: file.filename})
     return ({ message: 'success' });
  }

@Get('/:id/profile_image')
  seeUploadedFiles(@Param('id') image, @Res() res) {
    return res.sendFile(image, { root: './files' });
  }

}