import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  Headers,
} from '@nestjs/common';
import { UserService } from '.././Service/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Controller('api')
export class ChangeController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}
  @Post('/change-password')
  async ChangePassowrd(@Body() content: any, @Headers() headers) {
    try {
      const data = await this.jwtService.verifyAsync(headers.authorization);
      if (!data) {
        throw new UnauthorizedException();
      }
      const user = await this.userService.findOne({ name: data['name'] });
      const cont = content.content;
      const hashedPassword = await bcrypt.hash(cont, 12);
      await this.userService.update(user._id, {
        password: hashedPassword,
      });
      return 'done';
    } catch (error) {
      return 'error';
    }
  }
}
