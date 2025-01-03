import { ApiProperty } from '@nestjs/swagger';
import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';
import { Comment } from 'src/comments/entities/comment.entity';

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
  password?: string;

  @ApiProperty()
  @Column({ type: 'enum', enum: ['user', 'admin'] })
  role: string;

  @ApiProperty()
  @Column({ type: 'boolean' })
  banStatus: boolean;

  @ApiProperty()
  @OneToMany(() => Comment, (comment) => comment.user, { cascade: true })
  comments: Comment[];
}
