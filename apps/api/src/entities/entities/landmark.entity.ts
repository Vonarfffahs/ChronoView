import { ApiProperty } from '@nestjs/swagger';
import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class Landmark {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @ApiProperty()
  @Column({ type: 'varchar' })
  location: string;

  @ApiProperty()
  @Column({ type: 'geometry', spatialFeatureType: 'Point', srid: 4326 })
  coordinates: { type: string; coordinates: [number, number] };
}
