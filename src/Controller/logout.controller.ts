import {BadRequestException, Body, Controller, Get, Post, Req, Res, UnauthorizedException, Param} from '@nestjs/common';
import {UserService} from '.././Service/user.service';
import {JwtService} from "@nestjs/jwt";
import {Response, Request} from 'express';





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


