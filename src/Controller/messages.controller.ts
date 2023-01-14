import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  Headers,
  UseGuards,
  Get,
  Param
} from '@nestjs/common';
import { MessagesService } from '../Service/messages.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '../guard/auth.guard';
import { User } from '../decorator/header.decorator';


@Controller('api')
export class MessagesController {
  constructor(
    private readonly messagesService: MessagesService,
    private jwtService: JwtService,
  ) {}
  @Post('/messages-create')
  async CreateMessages(@Body() content: any) {
    console.log(content.id)
    await this.messagesService.create({room: content.room, id: content.id, name: content.name, text: content.text});

    return { message: 'success' };
  }


  @Post('/messages-show')
  async MessagesShow(@Body() req: any, @Headers() headers, @User() user) {
    console.log('eee')
    console.log(req)
    try {
      const data = await this.jwtService.verifyAsync(user);
      if (!data) {
        throw new UnauthorizedException();
      }
      const result =  await this.messagesService.finds({$or:[{room:req.room2}, {room:req.room1}]})
      return result
    } catch (error) {
      return 'error';
    }
  }

}
