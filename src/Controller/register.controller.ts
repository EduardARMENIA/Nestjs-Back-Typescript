import {BadRequestException, Body, Controller, Get, Post, Req, Res, UnauthorizedException, Param} from '@nestjs/common';
import {UserService} from '.././Service/user.service';
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";
import {Response, Request} from 'express';
import { Posts } from '.././Schema/post';
import { CreateCatDto } from '../dto/create-user.dto';
import { LoginCatDto } from '../dto/login-user.dto';




@Controller('api')
export class RegisterController {
    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService
    ) {
    }

    @Post('register')
    async register(
        @Body() user: CreateCatDto,
        @Res() res: Response,
        @Req() req: Request
    ) {
       try{ 
        const hashedPassword = await bcrypt.hash(user.password, 12);
        user.password = hashedPassword

        const register = await this.userService.create(
            user
        );

        delete user.password;

       res.json({ message: 'success' });  
       res.sendStatus(200);
      }catch(e){
        return (e)
      }
    }
}


