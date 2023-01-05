import { Module } from '@nestjs/common';
import { RegisterController } from '../Controller/register.controller';
import { LoginController } from '../Controller/login.controller';
import { UsersController } from '../Controller/users.controller';
import { ChangeController } from '../Controller/change.controller';
import { ProfileController } from '../Controller/profile.controller';
import { UserService } from '../Service/user.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { User, UserSchema } from '../Schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core'
import { AuthGuard } from '../guard/auth.guard';


@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '1d' },
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [
    RegisterController,
    LoginController,
    UsersController,
    ChangeController,
    ProfileController,
  ],
  providers: [UserService],
})
export class UserModule {}
