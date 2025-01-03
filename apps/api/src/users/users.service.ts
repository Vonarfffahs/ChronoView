/* eslint-disable @typescript-eslint/no-explicit-any */
import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRole } from '../auth/enums/role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const user: User = new User();
    user.username = createUserDto.username;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.role = createUserDto.role;
    user.banStatus = createUserDto.banStatus;
    return this.userRepository.save(user);
  }

  findAll(role?: UserRole): Promise<User[]> {
    if (role) {
      return this.userRepository.find({ where: { role } });
    }
    return this.userRepository.find();
  }

  async findOne(criteria: {
    username?: string;
    email?: string;
  }): Promise<User | undefined> {
    const { username, email } = criteria;

    if (username) {
      return this.userRepository.findOneBy({ username });
    }
    if (email) {
      return this.userRepository.findOneBy({ email });
    }

    return undefined;
  }

  update(id: number, updateUserDto: UpdateUserDto, req: any): Promise<User> {
    if (req.user.role === UserRole.Admin || req.user.userId === id) {
      const user: User = new User();
      user.username = updateUserDto.username;
      user.email = updateUserDto.email;
      user.password = updateUserDto.password;
      user.role = updateUserDto.role;
      user.banStatus = updateUserDto.banStatus;
      user.id = id;
      return this.userRepository.save(user);
    }
    throw new ForbiddenException();
  }

  remove(id: number, req: any): Promise<{ affected?: number }> {
    if (req.user.role === UserRole.Admin || req.user.userId === id) {
      return this.userRepository.delete(id);
    }
    throw new ForbiddenException();
  }
}
