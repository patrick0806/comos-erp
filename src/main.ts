import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionsFilter } from './global-exceptions.filter';
import { ActionLoggerInterceptor } from './shared/logger/action-logger.service';
import { AppLogger } from './shared/logger/app-logger.service';

async function bootstrap() {
  const appLogger = new AppLogger();
  const app = await NestFactory.create(AppModule, { logger: appLogger });
  app.useGlobalFilters(new GlobalExceptionsFilter(appLogger));
  app.useGlobalInterceptors(new ActionLoggerInterceptor(appLogger));
  await app.listen(3005);
}
bootstrap();
