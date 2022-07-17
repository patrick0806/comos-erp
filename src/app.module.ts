import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { MediaLibraryModule } from './media-library/media-library.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      database: process.env.DATABASE_NAME,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      synchronize: process.env.NODE_ENV === 'development' ? true : false,
      entities: [__dirname + '/**/*.entity{.js,.ts}'],
    }),
    UsersModule,
    MediaLibraryModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
