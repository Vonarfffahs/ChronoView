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
  date: string; // January 8, 99 BC

  @ApiProperty()
  @Column({ type: 'enum', enum: EventType })
  type: EventType;

  @ApiProperty()
  @Column({ type: 'geometry', spatialFeatureType: 'Point', srid: 4326 })
  coordinates: { type: string; coordinates: [number, number] };
}
