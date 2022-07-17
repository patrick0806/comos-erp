import { ConsoleLogger } from '@nestjs/common';
import { createLogger, format, transports } from 'winston';

const consoleTransport = new transports.Console({
  level: 'info',
});

const appTransports = [consoleTransport];

const logger = createLogger({
  level: 'info',
  exitOnError: false,
  format: format.json(),
  transports: appTransports,
});

export class AppLogger extends ConsoleLogger {
  log(message: any) {
    logger.log('info', message);
  }

  error(message: any) {
    logger.error(message);
  }

  warn(message: any) {
    logger.warn(message);
  }

  debug(message: any) {
    logger.debug(message);
  }

  verbose(message: any) {
    logger.verbose(message);
  }
}
