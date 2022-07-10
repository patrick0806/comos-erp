import { Body, Controller, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post('')
  async createSecureServer(@Body() newUser: User) {
    return this.usersService.createUser(newUser);
  }
}
