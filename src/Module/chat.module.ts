import { Module } from '@nestjs/common';
import { AppController } from '../Controller/chat.controller';
import { users } from '../utils/users';
import { ChatGateway } from '../utils/chat.gateway';
import { MessagesService } from '../Service/messages.service';
import { Messages, MessagesSchema } from '../Schema/messages.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { MessagesController } from '../Controller/messages.controller';

@Module({
   imports: [
    MongooseModule.forFeature([{ name: Messages.name, schema: MessagesSchema }]),
  ],
  controllers: [],
  providers: [MessagesService, users, ChatGateway],
})
export class ChatModule {}
