import {BadRequestException, Body, Controller, Get, Post, Req, Res, UnauthorizedException, Param} from '@nestjs/common';
import {UserService} from '../Services/user.service';
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";
import {Response, Request} from 'express';
import { Posts } from '../schemas/post';
import { CreateCatDto } from '../dto/create-user.dto';
import { LoginCatDto } from '../dto/login-user.dto';




@Controller('api')
export class ChangeController {
    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService
    ) {
    }
@Post('/:id/change-password')
    async postcomm(@Param('id') id, @Body() password: any, @Res() res: Response, @Req() req: Request)  {
     try {
        const user = await this.userService.findOne({ _id: id })
        const hashedPassword = await bcrypt.hash(password.content, 12);
        const create2 = await this.userService.update(user._id,{password: hashedPassword})
        console.log(create2)
        res.json(create2)

     } catch (error) {
        return 'error';
     }
   }    
}


