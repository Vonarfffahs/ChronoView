import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { HistoricalFigure } from './entities/historical-figure.entity';
import { Landmark } from './entities/landmark.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { CreateFigureDto } from './dto/create-figure.dto';
import { UpdateFigureDto } from './dto/update-figure.dto';
import { CreateLandmarkDto } from './dto/create-landmark.dto';
import { UpdateLandmarkDto } from './dto/update-landmark.dto';
import { EventType } from './event-type.enum';

@Injectable()
export class EntitiesService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(HistoricalFigure)
    private readonly figureRepository: Repository<HistoricalFigure>,
    @InjectRepository(Landmark)
    private readonly landmarkRepository: Repository<Landmark>,
  ) {}

  //Events
  async createEvent(createEventDto: CreateEventDto): Promise<Event> {
    const event = this.eventRepository.create(createEventDto);
    return this.eventRepository.save(event);
  }

  async updateEvent(
    id: number,
    updateEventDto: UpdateEventDto,
  ): Promise<Event> {
    await this.eventRepository.update(id, updateEventDto);
    return this.eventRepository.findOne({ where: { id } });
  }

  async findAllEvents(type?: EventType): Promise<Event[]> {
    if (type) {
      return this.eventRepository.find({ where: { type } });
    }
    return this.eventRepository.find();
  }

  async findOneEvent(id: number): Promise<Event> {
    const event = await this.eventRepository.findOneBy({ id });
    if (!event) {
      throw new Error('Event not found');
    }
    return event;
  }

  async deleteEvent(id: number): Promise<{ message: string }> {
    const result = await this.eventRepository.delete(id);
    if (!result.affected) {
      throw new Error('Event not found');
    }
    return { message: 'Event deleted successfully' };
  }

  //Historical Figure
  async createFigure(
    createFigureDto: CreateFigureDto,
  ): Promise<HistoricalFigure> {
    const figure = this.figureRepository.create(createFigureDto);
    return this.figureRepository.save(figure);
  }

  async updateFigure(
    id: number,
    updateFigureDto: UpdateFigureDto,
  ): Promise<HistoricalFigure> {
    await this.figureRepository.update(id, updateFigureDto);
    return this.figureRepository.findOne({ where: { id } });
  }

  async findAllFigures(): Promise<HistoricalFigure[]> {
    return this.figureRepository.find();
  }

  async findOneFigure(id: number): Promise<HistoricalFigure> {
    return this.figureRepository.findOneBy({ id });
  }

  async deleteFigure(id: number): Promise<{ affected?: number }> {
    return this.figureRepository.delete(id);
  }

  //Landmark;
  async createLandmark(
    createLandmarkDto: CreateLandmarkDto,
  ): Promise<Landmark> {
    const landmark = this.landmarkRepository.create(createLandmarkDto);
    return this.landmarkRepository.save(landmark);
  }

  async updateLandmark(
    id: number,
    updateLandmarkDto: UpdateLandmarkDto,
  ): Promise<Landmark> {
    await this.landmarkRepository.update(id, updateLandmarkDto);
    return this.landmarkRepository.findOne({ where: { id } });
  }

  async findAllLandmarks(): Promise<Landmark[]> {
    return this.landmarkRepository.find();
  }

  async findOneLandmark(id: number): Promise<Landmark> {
    return this.landmarkRepository.findOneBy({ id });
  }

  async deleteLandmark(id: number): Promise<{ affected?: number }> {
    return this.landmarkRepository.delete(id);
  }
}
