import { ApiProperty } from '@nestjs/swagger';
import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { EventType } from '../event-type.enum';

@Entity()
export class Event {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @ApiProperty()
  @Column('text')
  description: string;

  @ApiProperty()
  @Column({ type: 'date' })
  date: string; // YYYY-MM-DD

  @ApiProperty()
  @Column({ type: 'enum', enum: EventType })
  type: EventType;
}
