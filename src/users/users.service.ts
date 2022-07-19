import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { UserDTO } from './user.dto';
import { PrismaService } from '../shared/prisma/prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async findUser(email: string): Promise<any> {
    return this.prismaService.user.findFirst({
      where: { email },
      select: { id: true, email: true, name: true, image: true },
    });
  }

  async createUser(user: UserDTO): Promise<any> {
    const alreadyExistsUser = await this.findUser(user.email);

    if (alreadyExistsUser) {
      throw new HttpException(
        'There is already a registered user with this email',
        HttpStatus.CONFLICT,
      );
    }

    user.password = await this.createPasswordHash(user.password);
    const newUser = await this.prismaService.user.create({ data: user });
    delete newUser.password;
    return newUser;
  }

  private createPasswordHash(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }
}
