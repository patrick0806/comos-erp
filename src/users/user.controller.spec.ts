import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users/users.controller';
import { UsersService } from './users.service';
import { faker } from '@faker-js/faker';
import { UserEntity } from './user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UserController', () => {
  let userController: UsersController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {},
        },
      ],
    }).compile();

    userController = module.get<UsersController>(UsersController);
  });

  it('should be create a new user', async () => {
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

    jest.spyOn(userController, 'createUser').mockResolvedValue(createdUserMock);
    const user = await userController.createUser(newUser);

    expect(userController.createUser).toBeCalledTimes(1);
    expect(user.id).toBe(createdUserMock.id);
    expect(user.id).toEqual(createdUserMock.id);
    expect(user.name).toEqual(createdUserMock.name);
    expect(user.email).toEqual(createdUserMock.email);
    expect(user.image).toEqual(createdUserMock.image);
  });

  it('must find a user from their email', async () => {
    const emailToSearch = faker.internet.email();
    const findUserMock = {
      id: faker.datatype.uuid(),
      name: faker.name.findName(),
      email: faker.internet.email(),
      image: faker.image.imageUrl(),
    } as UserEntity;
    jest.spyOn(userController, 'findUser').mockResolvedValue(findUserMock);
    const user = await userController.findUser(
      faker.internet.email(emailToSearch),
    );
    expect(userController.findUser).toBeCalledTimes(1);
    expect(user.id).toBe(findUserMock.id);
    expect(user.id).toEqual(findUserMock.id);
    expect(user.name).toEqual(findUserMock.name);
    expect(user.email).toEqual(findUserMock.email);
    expect(user.image).toEqual(findUserMock.image);
  });
});
