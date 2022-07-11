import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findUser(email: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async createUser(user: UserDTO) {
    const alreadyExistsUser = await this.findUser(user.email);

    if (alreadyExistsUser) {
      throw new HttpException(
        'There is already a registered user with this email',
        HttpStatus.CONFLICT,
      );
    }

    user.password = await this.createPasswordHash(user.password);
    return this.prisma.user.create({ data: user });
  }

  private createPasswordHash(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }
}
