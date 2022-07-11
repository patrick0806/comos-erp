import { PrismaService } from '../prisma.service';
import { UsersService } from './users.service';
import { faker } from '@faker-js/faker';

describe('UsersService', () => {
  let usersService: UsersService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    prismaService = new PrismaService();
    usersService = new UsersService(prismaService);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  it('should create new user', async () => {
    const newUser: UserDTO = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      image: faker.image.imageUrl(),
      password: faker.random.word(),
    };
    const createdUser = await usersService.createUser(newUser);

    expect(createdUser.id).not.toBeNull();
    expect(createdUser.name).toEqual(newUser.name);
    expect(createdUser.email).toEqual(newUser.email);
    expect(createdUser.image).toEqual(newUser.image);
  });

  it('should fail on create another user with same email', async () => {
    const newUser: UserDTO = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      image: faker.image.imageUrl(),
      password: faker.random.word(),
    };

    const user = await usersService.createUser(newUser);
    try {
      await usersService.createUser(user);
      fail();
    } catch (err) {}
  });

  it('should find a user in database with her email', async () => {
    const newUser: UserDTO = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      image: faker.image.imageUrl(),
      password: faker.random.word(),
    };

    await usersService.createUser(newUser);

    const findUser = await usersService.findUser(newUser.email);
    expect(findUser.id).not.toBeNull();
    expect(findUser.name).toEqual(newUser.name);
    expect(findUser.email).toEqual(newUser.email);
    expect(findUser.image).toEqual(newUser.image);
  });
});
