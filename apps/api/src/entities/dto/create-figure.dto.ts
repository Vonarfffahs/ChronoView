import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

// const dateRegEx = /^(\d{4}\-\d{2}\-\d{2}$)/; // YYYY-MM-DD
const dateRegEx = /^[a-zA-Z]+ \d{1,2}, \d{1,4} (BC|AD)$/; // January 8, 99 BC
export class CreateFigureDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  biography: string;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(dateRegEx, {
    message: 'Please enter the life years in correct format (YYYY-MM-DD)',
  })
  birthDate: string; // YYYY-MM-DD

  @ApiProperty()
  @IsNotEmpty()
  @Matches(dateRegEx, {
    message: 'Please enter the life years in correct format (YYYY-MM-DD)',
  })
  deathDate: string; // YYYY-MM-DD
}
