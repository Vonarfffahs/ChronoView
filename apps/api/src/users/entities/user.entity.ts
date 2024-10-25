import { ApiProperty } from '@nestjs/swagger';
import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 30 })
  username: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 40 })
  email: string;

  @ApiProperty()
  @Column({ type: 'varchar' })
  password: string;

  @ApiProperty()
  @Column({ type: 'enum', enum: ['user', 'admin'] })
  role: string;

  @ApiProperty()
  @Column({ type: 'boolean' })
  banStatus: boolean;
}
