import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import * as fs from 'fs';
import * as path from 'path';

export const WINSTON_LOGGER = 'WINSTON_LOGGER';

export function createWinstonLogger() {
  const logDir = process.env.LOG_DIR || path.join(process.cwd(), 'logs');
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  return createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: format.combine(format.timestamp(), format.errors({ stack: true }), format.json()),
    defaultMeta: { service: process.env.APPLICATION_NAME },
    transports: [
      new transports.Console({
        format: format.combine(
          format.colorize(),
          format.timestamp(),
          format.printf(({ level, message, timestamp, ...meta }) => {
            const metaStr = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
            return `${timestamp} ${level}: ${message}${metaStr}`;
          })
        ),
      }),
      new DailyRotateFile({
        dirname: logDir,
        filename: `${process.env.APPLICATION_NAME || 'app'}-%DATE%.log`,
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '30d',
        level: process.env.LOG_LEVEL || 'info',
      }),
      new DailyRotateFile({
        dirname: logDir,
        filename: `${process.env.APPLICATION_NAME || 'app'}-error-%DATE%.log`,
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '60d',
        level: 'error',
      }),
    ],
  });
}
