import { Module, } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({
      secret: 'secretKey',
    })
  ],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule { }