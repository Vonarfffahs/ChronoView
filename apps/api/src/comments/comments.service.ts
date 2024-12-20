import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(
    createCommentDto: CreateCommentDto,
    userId: number,
  ): Promise<Comment> {
    const { content } = createCommentDto;

    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const comment = this.commentsRepository.create({
      content,
      user,
    });
    return this.commentsRepository.save(comment);
  }

  async findAll(): Promise<Comment[]> {
    return this.commentsRepository.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<Comment> {
    const comment = await this.commentsRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    return comment;
  }

  async update(
    id: number,
    updateCommentDto: UpdateCommentDto,
    userId: number,
  ): Promise<Comment> {
    const comment = await this.findOne(id);
    if (comment.user.id !== userId) {
      throw new ForbiddenException('You can only update your own comments');
    }

    Object.assign(comment, updateCommentDto);
    return this.commentsRepository.save(comment);
  }

  async remove(id: number, userId: number, isAdmin: boolean): Promise<void> {
    const comment = await this.findOne(id);
    if (comment.user.id !== userId && !isAdmin) {
      throw new ForbiddenException('You can only delete your own comments');
    }

    await this.commentsRepository.remove(comment);
  }
}
