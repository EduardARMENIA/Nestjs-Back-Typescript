import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '.././Service/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { CreateCatDto } from '../dto/create-user.dto';

@Controller('api')
export class RegisterController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Post('register')
  async Register(@Body() user: CreateCatDto) {
    try {
      user.password = await bcrypt.hash(user.password, 12);

      await this.userService.create(user);

      delete user.password;

      return { message: 'success' };
    } catch (e) {
      return e;
    }
  }
}
