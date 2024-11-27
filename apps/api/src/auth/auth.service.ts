import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string) {
    // Find the user
    const user = await this.usersService.findOne(username);
    const hash = user.password;
    // Check if the password is correct
    const match = await bcrypt.compare(pass, hash).then(function (
      result: boolean,
    ) {
      return result;
    });

    if (user && match) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signIn(user: any): Promise<{ access_token: string }> {
    const payload = { sub: user.id, username: user.username };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(payload: CreateUserDto): Promise<{ message: string }> {
    // Check if the user already exists
    const existingUser = await this.usersService.findOne(payload.username);
    if (existingUser) {
      throw new UnauthorizedException('Username is already taken');
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(payload.password, saltRounds);

    // Save the new user
    await this.usersService.create({ ...payload, password: hashedPassword });

    return { message: 'User successfully registered' };
  }
}
