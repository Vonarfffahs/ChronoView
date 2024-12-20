import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { Point } from 'typeorm';

const coordinatesRegEx = /^-?\d{1,2}\.\d+,\s?-?\d{1,3}\.d+$/; // x.xx, y.yy

export class CreateLandmarkDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  location: string;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(coordinatesRegEx, {
    message:
      'Please enter the latitude and longitude coordinates in decimal with "." separator.',
  })
  coordinates: Point;
}
