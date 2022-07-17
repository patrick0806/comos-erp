import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserDTO } from './user.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get(':email')
  async findUser(@Param('email') email: string) {
    return this.usersService.findUser(email);
  }

  @Post()
  async createUser(@Body() newUser: UserDTO) {
    return this.usersService.createUser(newUser);
  }
}
