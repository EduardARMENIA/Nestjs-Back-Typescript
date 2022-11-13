import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {RegisterController} from './Controlers/register.controller';
import {LoginController} from './Controlers/login.controller';
import {LogoutController} from './Controlers/logout.controller';
import {UsersController} from './Controlers/users.controller';
import {ChangeController} from './Controlers/change.controller';
import {UserService} from './Services/user.service';
import {JwtModule} from "@nestjs/jwt";
import { ConfigModule } from '@nestjs/config';
import { User, UserSchema } from './schemas/user.schema';
import { Posts, PostSchema } from './schemas/Post';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        ConfigModule.forRoot({envFilePath: '.env',}),
        JwtModule.register({
            secret: process.env.SECRET_KEY,
            signOptions: {expiresIn: '1d'}
        }),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
    ],
    controllers: [RegisterController, LoginController, LogoutController, UsersController, ChangeController],
    providers: [UserService],
})
export class UserModule {
}
