import { ApiProperty } from '@nestjs/swagger';
import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class HistoricalFigure {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @ApiProperty()
  @Column({ type: 'text' })
  biography: string;

  @ApiProperty()
  @Column({ type: 'date' })
  birthDate: string; // YYYY-MM-DD

  @ApiProperty()
  @Column({ type: 'date' })
  deathDate: string; // YYYY-MM-DD
}
