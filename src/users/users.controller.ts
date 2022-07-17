import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDTO } from './user.dto';
import { UserEntity } from './user.entity';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get(':email')
  @ApiParam({
    name: 'email',
    required: true,
    description: 'Find a user with their email',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Find a user with sucess',
    type: UserEntity,
  })
  @ApiResponse({
    status: 404,
    description: "Don't have a user with this email",
  })
  async findUser(@Param('email') email: string) {
    return this.usersService.findUser(email);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'User create with success',
    type: UserEntity,
  })
  @ApiResponse({
    status: 409,
    description: 'There is already a user registered with this email',
  })
  async createUser(@Body() newUser: UserDTO) {
    return this.usersService.createUser(newUser);
  }
}
