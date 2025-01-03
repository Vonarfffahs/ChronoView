import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EntitiesService } from './entities.service';

import { EventsController } from './controllers/events.controller';
import { FigureController } from './controllers/figures.controller';
import { LandmarkController } from './controllers/landmarks.controller';

import { Event } from './entities/event.entity';
import { HistoricalFigure } from './entities/historical-figure.entity';
import { Landmark } from './entities/landmark.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event, HistoricalFigure, Landmark])],
  controllers: [EventsController, FigureController, LandmarkController],
  providers: [EntitiesService],
})
export class EntitiesModule {}
