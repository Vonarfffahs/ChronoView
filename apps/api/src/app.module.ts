import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database.module';
import { RunningRealityModule } from './running-reality/running-reality.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    UsersModule,
    RunningRealityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
