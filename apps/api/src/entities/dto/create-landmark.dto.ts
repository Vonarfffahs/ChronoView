import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsObject, IsString } from 'class-validator';

import { IsGeoJSONPoint } from '../geojson-point.decorator';

export class CreateLandmarkDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  location: string;

  @ApiProperty({
    description: 'GeoJSON Point object',
    example: { type: 'Point', coordinates: [1.1, 1.2] },
  })
  @IsNotEmpty()
  @IsObject()
  @IsGeoJSONPoint()
  coordinates: { type: string; coordinates: [number, number] };
}
