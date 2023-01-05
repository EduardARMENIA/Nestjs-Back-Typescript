import { Module } from '@nestjs/common';
import { AppController } from '../Controller/chat.controller';
import { AppService } from '../Service/chat.service';
import { ChatGateway } from '../utils/chat.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class ChatModule {}
