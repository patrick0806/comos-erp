import { DocumentBuilder } from '@nestjs/swagger';

export const SwaggerConfig = new DocumentBuilder()
  .setTitle('Cosmo API')
  .setDescription('The Cosmo API description')
  .setVersion('1.0')
  .addTag('users')
  .build();
