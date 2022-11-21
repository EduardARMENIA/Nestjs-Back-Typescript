import {BadRequestException, Body, Controller, Get, Post, Req, Res, UnauthorizedException, Param, UseInterceptors, UploadedFile, Headers} from '@nestjs/common';
import {UserService} from '../Services/user.service';
import {JwtService} from "@nestjs/jwt";
import {Response, Request} from 'express';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from '../utils/file-upload.utils';




@Controller('api')
export class UsersController {
    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService
    ) {
    }

  
 @Get('users-name')
    async users(@Res() res: Response, @Req() req: Request)  {
     try {
        const user = await this.userService.find();
        res.send(user)
     } catch (error) {
        return 'error';
     }
   }
@Get('userss')
    async user(@Res() res: Response,
               @Req() req: Request) {
        try {
            const cookie = req.cookies['jwt'];
            console.log(cookie)

            const data = await this.jwtService.verifyAsync(cookie);

            if (!data) {
                throw new UnauthorizedException();
            }
            const user = await this.userService.findOne({_id: data['id']});

            res.send([user]);
        } catch (e) {
            console.log(e);
        }
    } 

}


