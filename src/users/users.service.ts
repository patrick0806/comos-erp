import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UserDTO } from './user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findUser(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: { email },
      select: ['id', 'name', 'email', 'image'],
    });
  }

  async createUser(user: UserDTO): Promise<UserEntity> {
    const alreadyExistsUser = await this.findUser(user.email);

    if (alreadyExistsUser) {
      throw new HttpException(
        'There is already a registered user with this email',
        HttpStatus.CONFLICT,
      );
    }

    user.password = await this.createPasswordHash(user.password);
    const newUser = await this.userRepository.save(user);
    delete newUser.password;
    return newUser;
  }

  private createPasswordHash(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }
}
