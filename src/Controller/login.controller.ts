import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../Service/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginCatDto } from '../dto/login-user.dto';

@Controller('api')
export class LoginController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}
  @Post('login')
  async Login(@Body() req: LoginCatDto) {
    console.log('donee');
    const user = await this.userService.findOne({ email: req.email });

    if (!user) {
      throw new BadRequestException('invalid credentials');
    }

    if (!(await bcrypt.compare(req.password, user.password))) {
      throw new BadRequestException('invalid credentials');
    }

    const jwt = await this.jwtService.signAsync({
      id: user._id,
      name: user.name,
    });
    return { message: 'success', token: jwt };
  }
}
