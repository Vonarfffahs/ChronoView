import { Controller, Post, Body } from '@nestjs/common';
import { RunningRealityService } from './running-reality.service';

@Controller('running-reality')
export class RunningRealityController {
  constructor(private readonly runningRealityService: RunningRealityService) {}

  @Post('set-date')
  setDate(@Body('date') date: string): string {
    return this.runningRealityService.setMapDate(date);
  }

  @Post('set-location')
  setLocation(
    @Body('lat') lat: number,
    @Body('lng') lng: number,
    @Body('zoom') zoom: number,
  ): string {
    return this.runningRealityService.setMapLocation(lat, lng, zoom);
  }
}
