import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  Headers,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../Service/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '../guard/auth.guard';
import { User } from '../decorator/header.decorator';

@Controller('api')
export class ChangeController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}
  @Post('/change-password')
  @UseGuards(AuthGuard)
  async ChangePassowrd(@Body() content: any, @Headers() headers, @User() user) {
    try {
      const data = await this.jwtService.verifyAsync(user);
      if (!data) {
        throw new UnauthorizedException();
      }
      const name = await this.userService.findOne({ name: data['name'] });
      const cont = content.content;
      const hashedPassword = await bcrypt.hash(cont, 12);
      await this.userService.update(name._id, {
        password: hashedPassword,
      });
      return 'done';
    } catch (error) {
      return 'error';
    }
  }
}
