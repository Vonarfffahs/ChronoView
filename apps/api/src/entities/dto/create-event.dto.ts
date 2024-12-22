import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsString,
  Matches,
} from 'class-validator';
import { EventType } from '../event-type.enum';

import { IsGeoJSONPoint } from '../geojson-point.decorator';

// const dateRegEx = /^-?\d{1,4}-\d{2}-\d{2}$/; // YYYY-MM-DD
const dateRegEx = /^[a-zA-Z]+ \d{1,2}, \d{1,4} (BC|AD)$/; // January 8, 99 BC

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
  @Matches(dateRegEx, {
    message: 'Please enter the life years in correct format (YYYY-MM-DD)',
  })
  date: string; // YYYY-MM-DD

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(EventType)
  type: EventType;

  @ApiProperty({
    description: 'GeoJSON Point object',
    example: { type: 'Point', coordinates: [1.1, 1.2] },
  })
  @IsNotEmpty()
  @IsObject()
  @IsGeoJSONPoint()
  coordinates: { type: string; coordinates: [number, number] };
}
