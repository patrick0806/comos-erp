import { UsersService } from './users.service';
import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UserDTO } from './user.dto';

describe('UsersService', () => {
  let usersService: UsersService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            save: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  it('should create new user', async () => {
    const newUser: UserDTO = {
      name: 'user',
      email: 'user@gmail.com',
      image:
        'https://i.picsum.photos/id/842/200/200.jpg?hmac=RW9iEgAYLKwoinQWSz_zrZHyOwmVEgqvoZTPebkRGMM',
      password: faker.random.word(),
    };

    const createdUserMock = {
      id: faker.datatype.uuid(),
      name: 'user',
      email: 'user@gmail.com',
      image:
        'https://i.picsum.photos/id/842/200/200.jpg?hmac=RW9iEgAYLKwoinQWSz_zrZHyOwmVEgqvoZTPebkRGMM',
    } as UserEntity;

    jest.spyOn(userRepository, 'save').mockResolvedValue(createdUserMock);

    const createdUser = await usersService.createUser(newUser);
    expect(userRepository.save).toBeCalledTimes(1);
    expect(userRepository.findOne).toBeCalledTimes(1);
    expect(createdUser.id).toEqual(createdUserMock.id);
    expect(createdUser.name).toEqual(newUser.name);
    expect(createdUser.email).toEqual(newUser.email);
    expect(createdUser.image).toEqual(newUser.image);
  });

  it('should find a user in database with her email', async () => {
    const userFoundMock = {
      id: faker.datatype.uuid(),
      name: 'user',
      email: 'user@gmail.com',
      image:
        'https://i.picsum.photos/id/842/200/200.jpg?hmac=RW9iEgAYLKwoinQWSz_zrZHyOwmVEgqvoZTPebkRGMM',
    } as UserEntity;
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(userFoundMock);

    const findUser = await usersService.findUser(userFoundMock.email);

    expect(userRepository.findOne).toBeCalledTimes(1);
    expect(findUser.id).toEqual(userFoundMock.id);
    expect(findUser.name).toEqual(userFoundMock.name);
    expect(findUser.email).toEqual(userFoundMock.email);
    expect(findUser.image).toEqual(userFoundMock.image);
  });
});
