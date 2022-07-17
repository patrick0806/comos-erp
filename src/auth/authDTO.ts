import { ApiProperty } from '@nestjs/swagger';

export class AuthDTO {
  @ApiProperty({
    description: 'User email to login',
    example: 'jhondoe@gmail.com',
    required: true,
  })
  email: string;
  @ApiProperty({
    description: 'User password to login',
    example: '123456',
    required: true,
  })
  passoword: string;
}
