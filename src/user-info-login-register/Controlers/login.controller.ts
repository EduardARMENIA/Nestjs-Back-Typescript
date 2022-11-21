import {BadRequestException, Body, Controller, Get, Post, Req, Res, UnauthorizedException, Param} from '@nestjs/common';
import {UserService} from '../Services/user.service';
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";
import {Response, Request} from 'express';
import { CreateCatDto } from '../dto/create-user.dto';
import { LoginCatDto } from '../dto/login-user.dto';




@Controller('api')
export class LoginController {
    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService
    ) {
    }
    @Post('login')
    async login(
        @Body() req: LoginCatDto,
        @Res({passthrough: true}) response: Response
    ) {
        const user = await this.userService.findOne({email: req.email});

        if (!user) {
            throw new BadRequestException('invalid credentials');
        }

        if (!await bcrypt.compare(req.password, user.password)) {
            throw new BadRequestException('invalid credentials');
        }

        const jwt = await this.jwtService.signAsync({id: user._id,name: user.name});

        
    
        return {
            message: 'success',
            token: jwt
        };
    }  
}


