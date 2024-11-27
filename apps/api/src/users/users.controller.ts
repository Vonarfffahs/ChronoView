import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { UserRole } from './user-role.enum';
import { Roles } from './user-roles.decorator';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create new user' })
  @ApiOkResponse({ type: User, isArray: true })
  @ApiBadRequestResponse()
  @Post()
  @Roles(UserRole.Admin, UserRole.User)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({ type: User, description: 'the user' })
  @ApiQuery({ name: 'role', required: false })
  @ApiNotFoundResponse()
  @ApiQuery({ name: 'role', enum: UserRole, required: false })
  @Get()
  @Roles(UserRole.Admin) //?
  findAll(@Query('role') role?: UserRole) {
    return this.usersService.findAll(role);
  }

  @ApiOperation({ summary: 'Get one user' })
  @ApiCreatedResponse({ type: User })
  @ApiNotFoundResponse()
  @Get(':username')
  @Roles(UserRole.Admin) //?
  findOne(@Param('username') username: string) {
    return this.usersService.findOne(username);
  }

  @ApiOperation({ summary: 'Update user' })
  @ApiCreatedResponse({ type: User })
  @ApiNotFoundResponse()
  @Patch(':id')
  @Roles(UserRole.Admin, UserRole.User)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiOperation({ summary: 'Delete user' })
  @ApiCreatedResponse({ type: User })
  @ApiNotFoundResponse()
  @Delete(':id')
  @Roles(UserRole.Admin, UserRole.User)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
