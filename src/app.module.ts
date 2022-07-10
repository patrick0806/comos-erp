import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      synchronize: false,
      migrationsTableName: 'database_migrations',
      migrations: ['src/db-migrations/*{.js,.ts}'],
      logging: !!process.env.LOG_SQL_QUERIES,
      ssl: process.env.NODE_ENV !== 'development' &&
        process.env.NODE_ENV !== 'test' && {
          rejectUnauthorized: false,
        },
      entities: [User],
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
