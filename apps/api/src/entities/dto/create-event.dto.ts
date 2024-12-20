import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';
import { EventType } from '../event-type.enum';

const dateRegEx = /^(\d{4}\-\d{2}\-\d{2}$)/; // YYYY-MM-DD

export class CreateEventDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  date: string; // YYYY-MM-DD

  @ApiProperty()
  @IsNotEmpty()
  @Matches(dateRegEx, {
    message: 'Please enter the life years in correct format (YYYY-MM-DD)',
  })
  @IsEnum(EventType)
  type: EventType;
}
