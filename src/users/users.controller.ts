import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post('')
  async createSecureServer(@Body() newUser: UserDTO) {
    return this.usersService.createUser(newUser);
  }
}
