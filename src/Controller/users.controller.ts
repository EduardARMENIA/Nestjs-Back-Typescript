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
  UseInterceptors,
  UploadedFile,
  Headers,
} from '@nestjs/common';
import { UserService } from '.././Service/user.service';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from '.././utils/file-upload.utils';

@Controller('api')
export class UsersController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Get('users-name')
  async users() {
    try {
      const user = await this.userService.find();
      return user;
    } catch (error) {
      return 'error';
    }
  }
  @Get('userss')
  async user(@Headers() headers) {
    try {
      const jwts = headers.authorization;
      const cookie = jwts;
      const data = await this.jwtService.verifyAsync(cookie);
      if (!data) {
        throw new UnauthorizedException();
      }
      const user = await this.userService.findOne({ _id: data['id'] });
      return [user];
    } catch (e) {
      console.log(e);
    }
  }
}
