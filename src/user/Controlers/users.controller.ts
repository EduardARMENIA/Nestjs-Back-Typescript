import {BadRequestException, Body, Controller, Get, Post, Req, Res, UnauthorizedException, Param} from '@nestjs/common';
import {UserService} from '../Services/user.service';
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";
import {Response, Request} from 'express';
import { Posts } from '../schemas/post';
import { CreateCatDto } from '../dto/create-user.dto';
import { LoginCatDto } from '../dto/login-user.dto';




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

            const data = await this.jwtService.verifyAsync(cookie);

            if (!data) {
                throw new UnauthorizedException();
            }
            console.log(data['name'])

            const user = await this.userService.findOne({name: data['name']});

            res.send([user]);
        } catch (e) {
            console.log(e);
        }
    }   


}


