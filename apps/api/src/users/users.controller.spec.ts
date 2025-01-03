import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserRole } from './user-role.enum';

describe('UsersController', () => {
  let controller: UsersController;

  const users = [
    {
      id: 1,
      username: 'user1',
      email: 'user1@gmail.com',
      password: 'Test@123',
      role: UserRole.Admin,
      banStatus: false,
    },
    {
      id: 2,
      username: 'user2',
      email: 'user2@gmail.com',
      password: 'Test@321',
      role: UserRole.User,
      banStatus: false,
    },
  ];

  const mockUserService = {
    create: jest.fn().mockImplementation((dto) => ({
      id: Math.floor(Math.random() * 100) + 1,
      ...dto,
    })),
    findAll: jest.fn().mockResolvedValue(users),
    findOne: jest.fn().mockImplementation((id) => {
      id = +id;
      return id === 1 ? users[0] : null;
    }),
    update: jest.fn().mockImplementation((id, dto) => {
      id = +id;
      return id === 1 ? { id, ...dto } : null;
    }),
    remove: jest.fn().mockImplementation((id) => {
      return id === 1 ? users[0] : null;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUserService)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should create a user', () => {
    const createUserDto = {
      username: 'testuser',
      email: 'unittestuser@gmail.com',
      password: 'Test@123',
      role: UserRole.User,
      banStatus: false,
    };

    expect(controller.create(createUserDto)).toEqual({
      id: expect.any(Number),
      ...createUserDto,
    });
    expect(mockUserService.create).toHaveBeenCalledWith(createUserDto);
  });

  it('should find all users', async () => {
    const allUsers = await controller.findAll();
    expect(allUsers).toEqual(users);
    expect(mockUserService.findAll).toHaveBeenCalled();
  });

  it('should find a user by id', () => {
    expect(controller.findOne('1')).toEqual(users[0]);
    expect(mockUserService.findOne).toHaveBeenCalledWith(1);
  });

  it('should update a user', () => {
    const createUserDto = {
      username: 'testuser',
      email: 'unittestuser@gmail.com',
      password: 'Test@123',
      role: UserRole.User,
      banStatus: false,
    };

    expect(controller.update('1', createUserDto)).toEqual({
      id: 1,
      ...createUserDto,
    });
    expect(mockUserService.update).toHaveBeenCalledWith(1, createUserDto);
  });

  it('should remove a user', () => {
    expect(controller.remove('1')).toEqual(users[0]);
    expect(mockUserService.remove).toHaveBeenCalledWith(1);
  });

  it('should return null if user not found', () => {
    expect(controller.findOne('999')).toBeNull();
    expect(mockUserService.findOne).toHaveBeenCalledWith(999);
  });

  it('should return null when updating a non-existing user', () => {
    const createUserDto = {
      username: 'nonexistinguser',
      email: 'nonexistinguser@gmail.com',
      password: 'NonEx@123',
      role: UserRole.User,
      banStatus: false,
    };

    expect(controller.update('999', createUserDto)).toBeNull();
    expect(mockUserService.update).toHaveBeenCalledWith(999, createUserDto);
  });

  it('should return null if trying to remove a non-existing user', () => {
    expect(controller.remove('999')).toBeNull();
    expect(mockUserService.remove).toHaveBeenCalledWith(999);
  });
});
