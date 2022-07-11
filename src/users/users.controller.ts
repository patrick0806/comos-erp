import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get(':email')
  async findUser(@Param('email') email: string) {
    return this.usersService.findUser(email);
  }

  @Post()
  async createSecureServer(@Body() newUser: UserDTO) {
    return this.usersService.createUser(newUser);
  }
}
