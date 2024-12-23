import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CreateEventDto } from '../dto/create-event.dto';
import { UpdateEventDto } from '../dto/update-event.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Event } from '../entities/event.entity';
import { EventType } from '../event-type.enum';
import { EntitiesService } from '../entities.service';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/auth/enums/role.enum';

@ApiTags('events')
@Controller('events')
export class EventsController {
  constructor(private readonly entitiesService: EntitiesService) {}

  // Event
  // create
  @ApiOkResponse({ type: Event, description: 'Event create successfully' })
  @ApiBadRequestResponse({ description: 'Invalid event data' })
  @Post('/')
  @Roles(UserRole.Admin)
  async createEvent(@Body() createEventDto: CreateEventDto): Promise<Event> {
    return this.entitiesService.createEvent(createEventDto);
  }

  //get all
  @ApiOkResponse({
    type: Event,
    isArray: true,
    description: 'List of events retrieved successfully',
  })
  @ApiQuery({
    name: 'type',
    enum: EventType,
    required: false,
    description: 'Filter events by type',
  })
  @ApiNotFoundResponse({ description: 'No events found' })
  @Get('/')
  @Roles(UserRole.Admin, UserRole.User)
  async findAllEvent(@Query('type') type?: EventType): Promise<Event[]> {
    return this.entitiesService.findAllEvents(type);
  }

  //get by id
  @ApiCreatedResponse({
    type: Event,
    description: 'Event retrieved successfully',
  })
  @ApiNotFoundResponse({ description: 'Event not found' })
  @Get('/:id')
  @Roles(UserRole.Admin, UserRole.User)
  async findOneEvent(@Param('id') id: string): Promise<Event> {
    return this.entitiesService.findOneEvent(+id);
  }

  //update
  @ApiCreatedResponse({ type: Event, description: 'Event update successfully' })
  @ApiNotFoundResponse({ description: 'Event not found' })
  @Patch('/:id')
  @Roles(UserRole.Admin)
  async updateEvent(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
  ): Promise<Event> {
    return this.entitiesService.updateEvent(+id, updateEventDto);
  }

  //delete
  @ApiCreatedResponse({ description: 'Event deleted successfully' })
  @ApiNotFoundResponse({ description: 'Event not found' })
  @Delete('/:id')
  @Roles(UserRole.Admin)
  async deleteEvent(@Param('id') id: string): Promise<void> {
    await this.entitiesService.deleteEvent(+id);
  }
}
