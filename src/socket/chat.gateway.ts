import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import { users } from '../Service/chat.service';
import { MessagesService } from '../Service/messages.service';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
    allowedHeaders:
      'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe,  Authorization,  my-custom-header',
    transports: ['websocket', 'polling'],
  },
  allowEIO3: true,
})
export class ChatGateway implements OnGatewayInit {
  constructor(
    private readonly users: users,
    private readonly messagesService: MessagesService,
  ) {}
  @WebSocketServer() wss: Server;

  private logger: Logger = new Logger('ChatGateway');

  afterInit(server: any) {
    this.logger.log('Initialized!');
  }

  @SubscribeMessage('userJoined')
  handleRoomJoin(socket: Socket, data) {
    const m = (name, text, id, room) => ({ name, text, id, room });

    if (!data.name || !data.room) {
      return 'Данные некорректны';
    }
    socket.join(data.room);

    if (this.users.getByRoom(data.room[0]) !== undefined) {
      this.users.add({
        id: socket.id,
        name: data.name,
        room: data.room[0],
      });
    } else {
      this.users.add({
        id: socket.id,
        name: data.name,
        room: data.room[1],
      });
    }
    socket.to(data.room).emit('updateUsers', this.users.getByRoom(data.room));
    socket.emit(
      'newMessage',
      m('admin', `Пользователь ${data.name} зашел.`, 'e', 'e'),
    );
    socket.broadcast
      .to('e - e')
      .emit(
        'newMessage',
        m('admin', `Пользователь ${data.name} зашел.`, 'e', 'e'),
      );
    return { userId: socket.id };
  }

  @SubscribeMessage('createMessage')
  async handleMessage(socket: Socket, data) {
    const m = (name, text, id, room) => ({ name, text, id, room });
    if (!data.text) {
      return 'Текст не может быть пустым';
    }
    const user = this.users.get(data.id);
    if (user) {
      if (this.users.getByRoom(user.room[0]) !== undefined) {
        await this.messagesService.create({
          room: data.room,
          id: data.id,
          name: user.name,
          text: data.text,
        });
        this.wss
          .in(data.room)
          .emit('newMessage', m(user.name, data.text, data.id, data.room));
      } else {
        await this.messagesService.create({
          room: data.room,
          id: data.id,
          name: user.name,
          text: data.text,
        });
        this.wss
          .in(data.room[0])
          .emit('newMessage', m(user.name, data.text, data.id, data.room));
      }
    }
    return 'done';
  }

  @SubscribeMessage('userLeft')
  async userLeft(socket: Socket, id) {
    this.users.remove(socket.id);
    const user = this.users.remove(id);
    if (user) {
      this.wss.in(id.room).emit('updateUsers', this.users.getByRoom(id.room));
    }
    return 'done';
  }

  @SubscribeMessage('disconnect')
  async disConnect(socket: Socket, id) {
    const user = this.users.remove(socket.id);
    if (user) {
      this.wss.in(id.room).emit('updateUsers', this.users.getByRoom(id.room));
    }
    return 'done';
  }
}
