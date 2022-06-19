import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/users.module';
import { TeamModule } from './team/teams.module';
import { PlayerModule } from './player/player.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot('mongodb+srv://sport:sport789786@cluster0.wpdqn.mongodb.net/test', { useNewUrlParser: true }),
    UserModule,
    TeamModule,
    PlayerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
