import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRole } from '../auth/enums/role.enum';
import { Roles } from '../auth/roles.decorator';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/role.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new user' })
  @ApiOkResponse({ type: User, isArray: true })
  @ApiBadRequestResponse()
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Admin, UserRole.User)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({ type: User, description: 'the user' })
  @ApiQuery({ name: 'role', required: false })
  @ApiNotFoundResponse()
  @ApiQuery({ name: 'role', enum: UserRole, required: false })
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Admin) //?
  findAll(@Query('role') role?: UserRole) {
    return this.usersService.findAll(role);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get one user' })
  @ApiCreatedResponse({ type: User })
  @ApiNotFoundResponse()
  @Get(':username')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Admin) //?
  findOne(@Param('username') username: string) {
    return this.usersService.findOne({
      username: username,
    });
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user' })
  @ApiCreatedResponse({ type: User })
  @ApiNotFoundResponse()
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Admin, UserRole.User)
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req,
  ) {
    return this.usersService.update(+id, updateUserDto, req);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete user' })
  @ApiCreatedResponse({ type: User })
  @ApiNotFoundResponse()
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Admin, UserRole.User)
  remove(@Param('id') id: string, @Req() req) {
    return this.usersService.remove(+id, req);
  }
}
