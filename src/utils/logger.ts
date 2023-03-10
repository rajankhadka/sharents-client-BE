import * as winston from 'winston';
import * as path from 'path';
import { E_LOGS, checkFile } from './make-new-for-logs.utils';

export const winstonLoggerUtils = {
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.ms(),
    winston.format.printf(({ timestamp, level, message, context, stack }) => {
      const _context = context ? `[${context}] : ` : '';
      const _stack = stack ? `: [stack]: ${stack} : ` : '';
      return `${timestamp} ${level}: ${_context} ${message} ${_stack}`;
    }),
  ),
  transports: [
    new winston.transports.File({
      level: 'error',
      dirname: path.join(process.cwd(), 'logs', 'error'),
      filename: checkFile(new Date(), E_LOGS.INFO),
      maxFiles: 30,
      //   maxsize: 20,
    }),
    new winston.transports.File({
      level: 'debug',
      dirname: path.join(process.cwd(), 'logs', 'info'),
      filename: checkFile(new Date(), E_LOGS.INFO),
      maxFiles: 30,
      //   maxsize: 20,
    }),
    new winston.transports.Console(),
  ],
};
