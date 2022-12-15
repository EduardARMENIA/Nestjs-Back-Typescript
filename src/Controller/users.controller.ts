import {
  Controller,
  Get,
  UnauthorizedException,
  Headers,
} from '@nestjs/common';
import { UserService } from '.././Service/user.service';
import { JwtService } from '@nestjs/jwt';

@Controller('api')
export class UsersController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Get('users')
  async Users() {
    try {
      const user = await this.userService.find();
      return user;
    } catch (error) {
      return 'error';
    }
  }
  @Get('usersid')
  async UserId(@Headers() headers) {
    try {
      const data = await this.jwtService.verifyAsync(headers.authorization);
      if (!data) {
        throw new UnauthorizedException();
      }
      const user = await this.userService.findOne({ _id: data['id'] });
      return [user];
    } catch (e) {
      return e;
    }
  }
}
