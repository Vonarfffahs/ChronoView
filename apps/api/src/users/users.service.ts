import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRole } from './user-role.enum';

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

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ username });
  }

  update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user: User = new User();
    user.username = updateUserDto.username;
    user.email = updateUserDto.email;
    user.password = updateUserDto.password;
    user.role = updateUserDto.role;
    user.banStatus = updateUserDto.banStatus;
    user.id = id;
    return this.userRepository.save(user);
  }

  remove(id: number): Promise<{ affected?: number }> {
    return this.userRepository.delete(id);
  }
}
