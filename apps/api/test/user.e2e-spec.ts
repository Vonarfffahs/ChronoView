import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { Comment } from '../src/comments/entities/comment.entity';
import { User } from '../src/users/entities/user.entity';
import { UsersModule } from '../src/users/users.module';
import { JwtAuthGuard } from '../src/auth/jwt-auth.guard';
import { RolesGuard } from '../src/auth/role.guard';
import { UserRole } from '../src/auth/enums/role.enum';

describe('UsersController (e2e)', () => {
  let app: INestApplication;

  let userRepository: Repository<User>;

  let dataSource: DataSource;

  jest.mock('../src/auth/role.guard', () => {
    return {
      RolesGuard: jest.fn().mockImplementation(() => ({
        canActivate: jest.fn(() => true),
      })),
    };
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: 'masalar192112',
          database: 'chrono-view-test',
          entities: [User, Comment],
          synchronize: true,
          dropSchema: true,
          logging: false,
        }),
        TypeOrmModule.forFeature([User, Comment]),
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: (context) => {
          const request = context.switchToHttp().getRequest();
          request.user = {
            userId: 1,
            role: UserRole.Admin,
          };
          return true;
        },
      })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: () => true })
      .compile();

    app = moduleFixture.createNestApplication();
    dataSource = moduleFixture.get<DataSource>(DataSource);
    userRepository = moduleFixture.get<Repository<User>>(
      getRepositoryToken(User),
    );

    await userRepository.save([
      {
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'Test@123',
        role: UserRole.Admin,
        banStatus: false,
      },
    ]);

    await app.init();
  });

  afterEach(async () => {
    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }
  });

  it('/users (POST)', async () => {
    const newUser = {
      username: 'newuser',
      email: 'newuser@example.com',
      password: 'New@123',
      role: UserRole.User,
      banStatus: false,
    } as Partial<User>;

    const response = await request(app.getHttpServer())
      .post('/users')
      .send(newUser)
      .expect(201);

    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        username: 'newuser',
        email: 'newuser@example.com',
        role: UserRole.User,
        banStatus: false,
      }),
    );
  });

  it('/users (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/users')
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
  });

  it('/users/:username (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/users/testuser')
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        username: 'testuser',
        email: 'testuser@example.com',
        role: UserRole.Admin,
        banStatus: false,
      }),
    );
  });

  it('/users/:id (PATCH)', async () => {
    const user = await userRepository.save({
      username: 'testuser2',
      email: 'testuser2@example.com',
      password: 'Test@123',
      role: UserRole.User,
      banStatus: false,
    });

    const updatedUser = {
      username: 'updateduser',
      email: 'testuser2@example.com',
      password: 'Test@123',
      role: UserRole.User,
      banStatus: false,
    };

    const response = await request(app.getHttpServer())
      .patch(`/users/${user.id}`)
      .send(updatedUser)
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        id: user.id,
        username: 'updateduser',
        email: 'testuser2@example.com',
        password: 'Test@123',
        role: UserRole.User,
        banStatus: false,
      }),
    );
  });

  it('/users/:id (DELETE)', async () => {
    const user = await userRepository.save({
      username: 'testuser3',
      email: 'testuser3@example.com',
      password: 'Test@123',
      role: UserRole.User,
      banStatus: false,
    });

    await request(app.getHttpServer()).delete(`/users/${user.id}`).expect(200);

    const deletedUser = await userRepository.findOne({
      where: { id: user.id },
    });
    expect(deletedUser).toBeNull();
  });
});
