import { ApiProperty } from '@nestjs/swagger';
import { ImageEntity } from 'src/media-library/image.entity';

export class UserDTO {
  @ApiProperty({
    description: 'User name',
    example: 'Jhon Doe',
    required: true,
  })
  name: string;
  @ApiProperty({
    description: 'User email',
    example: 'jhondoe@gmail.com',
    required: true,
  })
  email: string;
  @ApiProperty({
    description: 'user password',
    example: '123456',
    required: true,
  })
  password: string;
  @ApiProperty({
    description: 'user image',
    example: 'https://picsum.photos/200/300',
    required: false,
  })
  image?: ImageEntity;
}
