import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

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
      logging: !!process.env.LOG_SQL_QUERIES,
      ssl: process.env.NODE_ENV !== 'development' &&
        process.env.NODE_ENV !== 'test' && {
          rejectUnauthorized: false,
        },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
