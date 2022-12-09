import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  Param,
} from '@nestjs/common';
import { UserService } from '.././Service/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { Posts } from '.././Schema/post.schema';
import { CreateCatDto } from '../dto/create-user.dto';
import { LoginCatDto } from '../dto/login-user.dto';

@Controller('api')
export class RegisterController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Post('register')
  async register(@Body() user: CreateCatDto) {
    try {
      const hashedPassword = await bcrypt.hash(user.password, 12);
      user.password = hashedPassword;

      const register = await this.userService.create(user);

      delete user.password;

      return { message: 'success' };
    } catch (e) {
      return e;
    }
  }
}
