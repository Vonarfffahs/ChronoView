import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserRole } from './user-role.enum';

describe('UsersService', () => {
  let service: UsersService;
  let usersRepository: jest.Mocked<Repository<User>>;

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

  beforeEach(async () => {
    const mockUserRepository = {
      save: jest.fn(),
      find: jest.fn(),
      findOneBy: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: mockUserRepository },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    usersRepository = module.get(getRepositoryToken(User));
  });

  it('should save a new user', async () => {
    const createUserDto = {
      username: 'testuser',
      email: 'unittestuser@gmail.com',
      password: 'Test@123',
      role: UserRole.User,
      banStatus: false,
    };

    const savedUser = { id: 1, ...createUserDto };
    usersRepository.save.mockResolvedValue(savedUser);
    const result = await service.create(createUserDto);
    expect(result).toEqual(savedUser);
    expect(usersRepository.save).toHaveBeenCalledWith(
      expect.objectContaining(createUserDto),
    );
  });

  it('should throw an error when save fails', async () => {
    const createUserDto = {
      username: 'testuser',
      email: 'unittestuser@gmail.com',
      password: 'Test@123',
      role: UserRole.User,
      banStatus: false,
    };

    usersRepository.save.mockRejectedValue(new Error('Database error'));
    await expect(service.create(createUserDto)).rejects.toThrow(
      'Database error',
    );
  });

  it('should find all users', async () => {
    usersRepository.find.mockResolvedValue(users);
    const result = await service.findAll();

    expect(result).toEqual(users);
    expect(usersRepository.find).toHaveBeenCalledWith();
  });

  it('should return an empty array when no users are found', async () => {
    usersRepository.find.mockResolvedValue([]);
    const result = await service.findAll();

    expect(result).toEqual([]);
    expect(usersRepository.find).toHaveBeenCalledWith();
  });

  it('should find all users by role', async () => {
    usersRepository.find.mockResolvedValue(users);
    const role = UserRole.Admin;
    const result = await service.findAll(role);

    expect(result).toEqual(users);
    expect(usersRepository.find).toHaveBeenCalledWith({ where: { role } });
  });

  it('should return an empty array when no users are found for the given role', async () => {
    usersRepository.find.mockResolvedValue([]);
    const role = UserRole.Admin;
    const result = await service.findAll(role);

    expect(result).toEqual([]);
    expect(usersRepository.find).toHaveBeenCalledWith({ where: { role } });
  });

  it('should find one user by id', async () => {
    usersRepository.findOneBy.mockResolvedValue(users[0]);
    const result = await service.findOne(1);

    expect(result).toEqual(users[0]);
    expect(usersRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
  });

  it('should return null when user is not found by id', async () => {
    usersRepository.findOneBy.mockResolvedValue(null);
    const result = await service.findOne(999);

    expect(result).toBeNull();
  });

  it('should update a user', async () => {
    const updateUserDto = {
      username: 'updateduser',
      email: 'updateduser@gmail.com',
      password: 'Updated@123',
      role: UserRole.User,
      banStatus: false,
    };

    const updatedUser = { id: 1, ...updateUserDto };
    usersRepository.save.mockResolvedValue(updatedUser);
    const result = await service.update(1, updateUserDto);
    expect(result).toEqual(updatedUser);
    expect(usersRepository.save).toHaveBeenCalledWith(
      expect.objectContaining({ id: 1, ...updateUserDto }),
    );
  });

  it('should throw an error when update fails', async () => {
    const updateUserDto = {
      username: 'updateduser',
      email: 'updateduser@gmail.com',
      password: 'Updated@123',
      role: UserRole.User,
      banStatus: false,
    };

    usersRepository.save.mockRejectedValue(new Error('Database error'));
    await expect(service.update(1, updateUserDto)).rejects.toThrow(
      'Database error',
    );
  });

  it('should remove a user by id', async () => {
    const mockDeleteResult = { affected: 1, raw: [] };
    usersRepository.delete.mockResolvedValue(mockDeleteResult);
    const result = await service.remove(1);

    expect(result).toEqual(mockDeleteResult);
    expect(usersRepository.delete).toHaveBeenCalledWith(1);
  });

  it('should return no affected rows if user does not exist on delete', async () => {
    const mockDeleteResult = { affected: 0, raw: [] };
    usersRepository.delete.mockResolvedValue(mockDeleteResult);
    const result = await service.remove(999);
    expect(result).toEqual(mockDeleteResult);
    expect(usersRepository.delete).toHaveBeenCalledWith(999);
  });

  it('should find users by role and banStatus', async () => {
    usersRepository.find.mockResolvedValue([users[0]]);
    const result = await service.findAll(UserRole.Admin);

    expect(result).toEqual([users[0]]);
    expect(usersRepository.find).toHaveBeenCalledWith({
      where: { role: UserRole.Admin },
    });
  });
});
