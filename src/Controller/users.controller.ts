import {
  Controller,
  Get,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../Service/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '../guard/auth.guard';
import { User } from '../decorator/header.decorator';

@Controller('api')
export class UsersController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Get('users')
  async Users() {
    try {
      return await this.userService.find();
    } catch (error) {
      return 'error';
    }
  }
  @Get('usersid')
  @UseGuards(AuthGuard)
  async UserId(@User() user) {
    try {
      const data = await this.jwtService.verifyAsync(user);
      if (!data) {
        throw new UnauthorizedException();
      }
      return [await this.userService.findOne({ _id: data['id'] })];
    } catch (e) {
      return e;
    }
  }
}
