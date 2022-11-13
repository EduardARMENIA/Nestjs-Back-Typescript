import {BadRequestException, Body, Controller, Get, Post, Req, Res, UnauthorizedException, Param} from '@nestjs/common';
import {UserService} from '../Services/user.service';
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";
import {Response, Request} from 'express';
import { Posts } from '../schemas/post';
import { CreateCatDto } from '../dto/create-user.dto';
import { LoginCatDto } from '../dto/login-user.dto';




@Controller('api')
export class LogoutController {
    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService
    ) {
    }

    @Post('logout')
    async logout(@Res({passthrough: true}) response: Response) {
        response.clearCookie('jwt');

       
        response.json({ message: 'success' });  
        
    }
}


