import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { RunningRealityService } from './running-reality.service';
import { RunningRealityController } from './running-reality.controller';

@Module({
  imports: [HttpModule],
  providers: [RunningRealityService],
  controllers: [RunningRealityController],
})
export class RunningRealityModule {}
