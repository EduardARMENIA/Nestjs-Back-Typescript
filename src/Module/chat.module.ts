import { Module } from '@nestjs/common';
import { users } from '../Service/chat.service';
import { ChatGateway } from '../socket/chat.gateway';
import { MessagesService } from '../Service/messages.service';
import { Messages, MessagesSchema } from '../Schema/messages.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Messages.name, schema: MessagesSchema },
    ]),
  ],
  controllers: [],
  providers: [MessagesService, users, ChatGateway],
})
export class ChatModule {}
