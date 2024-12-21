import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsObject, IsString } from 'class-validator';

import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsGeoJSONPoint(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsGeoJSONPoint',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (
            value &&
            typeof value === 'object' &&
            value.type === 'Point' &&
            Array.isArray(value.coordinates) &&
            value.coordinates.length === 2
          ) {
            const [lat, lon] = value.coordinates;
            return (
              typeof lat === 'number' &&
              typeof lon === 'number' &&
              lat >= -90 &&
              lat <= 90 &&
              lon >= -180 &&
              lon <= 180
            );
          }
          return false;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid GeoJSON Point with latitude and longitude in valid ranges`;
        },
      },
    });
  };
}

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
