import { Inject, Injectable } from '@nestjs/common';
import type { Logger } from 'winston';
import { WINSTON_LOGGER } from '.';
import { transports, format } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

import { LogType } from '../enums/logger.enum';
import { LogAppender, LogConfig, ConsoleLogOptions, FileLogOptions, LogOptions } from '../../property/dtos/logger.model';

@Injectable()
export class LoggerService {
  private currentAppender?: LogAppender;
  private isCustomFormatEnabled: boolean = true;
  private context?: string;
  public readonly stream = { write: (message: any) => this.info(typeof message === 'string' ? message.trim() : String(message)) };

  constructor(@Inject(WINSTON_LOGGER) private readonly logger: Logger) { }

  /**
   * Initializes logger transports using `logAppender` from application properties.
   * @param logAppender Transport definitions (console and rolling file)
   * @param customFormat When true, use printf formatter; otherwise JSON
   * @returns True when configuration applied successfully
   */
  init(logAppender: LogAppender, customFormat: boolean = true): boolean {
    if (!logAppender) return false;
    this.currentAppender = logAppender;

    const config: LogConfig = new LogConfig();
    config.customFormat = customFormat;
    config.type = LogType.multi;
    config.options = new LogOptions();
    config.options.console = new ConsoleLogOptions();
    config.options.file = new FileLogOptions();
    config.options.file.filename = logAppender.rollingFileAppender.filename;
    config.options.file.maxfiles = logAppender.rollingFileAppender.backups as any;
    config.options.file.maxsize = logAppender.rollingFileAppender.maxLogSize as any;

    return this.configure(config);
  }

  /**
   * Applies transport configuration derived from `LogConfig`.
   * @param config Combined configuration for console/file transports
   * @returns True when at least one transport is configured
   */
  private configure(config: LogConfig): boolean {
    this.isCustomFormatEnabled = config.customFormat;
    let flag = false;

    this.logger.clear();

    if (config.type === LogType.multi) {
      const c = this.configureConsoleLogger(config.options.console, config.customFormat);
      const f = this.configureFileLogger(config.options.file, config.customFormat);
      if (c) this.logger.add(c);
      if (f) this.logger.add(f);
      flag = !!(c || f);
    } else if (config.type === LogType.console) {
      const c = this.configureConsoleLogger(config.options.console, config.customFormat);
      if (c) this.logger.add(c);
      flag = !!c;
    } else if (config.type === LogType.file) {
      const f = this.configureFileLogger(config.options.file, config.customFormat);
      if (f) this.logger.add(f);
      flag = !!f;
    } else {
      const c = this.configureConsoleLogger(config.options.console, config.customFormat);
      if (c) this.logger.add(c);
      flag = !!c;
    }

    return flag;
  }

  for(context: string): LoggerService {
    const scoped = new LoggerService(this.logger as any);
    scoped.setContext(context);
    return scoped;
  }

  private setContext(context: string) {
    this.context = context;
  }

  /**
   * Builds a Console transport with optional human-readable formatting.
   * @param options Console transport options
   * @param customFormat When true, use printf formatter; otherwise JSON
   */
  private configureConsoleLogger(options: ConsoleLogOptions, customFormat: boolean) {
    return new transports.Console({
      level: options?.level || process.env.LOG_LEVEL || 'info',
      format: format.combine(
        format.colorize(),
        format.timestamp(),
        customFormat
          ? format.printf(({ level, message, timestamp, ...meta }) => {
            const metaStr = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
            return `${timestamp} ${level}: ${message}${metaStr}`;
          })
          : format.json()
      ),
    });
  }

  /**
   * Builds a DailyRotateFile transport with optional human-readable formatting.
   * @param options File transport options
   * @param customFormat When true, use printf formatter; otherwise JSON
   */
  private configureFileLogger(options: FileLogOptions, customFormat: boolean) {
    const filename = options?.filename || (this.currentAppender?.rollingFileAppender?.filename ?? 'app-%DATE%.log');
    const maxFiles = options?.maxfiles ?? (this.currentAppender?.rollingFileAppender?.backups ?? '30d');
    const maxSize = options?.maxsize ?? (this.currentAppender?.rollingFileAppender?.maxLogSize ?? '20m');
    return new DailyRotateFile({
      filename,
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxFiles: typeof maxFiles === 'number' ? `${maxFiles}d` : maxFiles,
      maxSize: typeof maxSize === 'number' ? `${maxSize}m` : maxSize,
      level: options?.level || process.env.LOG_LEVEL || 'info',
      format: customFormat
        ? format.combine(
          format.timestamp(),
          format.printf(({ level, message, timestamp, ...meta }) => {
            const metaStr = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
            return `${timestamp} ${level}: ${message}${metaStr}`;
          })
        )
        : format.json(),
    });
  }

  /** Logs an `info` level message with optional metadata */
  info(message: string, meta?: Record<string, unknown>) {
    const merged = { service: this.context ?? process.env.APPLICATION_NAME, ...(meta ?? {}) };
    this.logger.info(message, merged);
  }

  /** Logs an `error` level message with optional metadata */
  error(message: string, meta?: Record<string, unknown>) {
    const merged = { service: this.context ?? process.env.APPLICATION_NAME, ...(meta ?? {}) };
    this.logger.error(message, merged);
  }

  /** Logs a `warn` level message with optional metadata */
  warn(message: string, meta?: Record<string, unknown>) {
    const merged = { service: this.context ?? process.env.APPLICATION_NAME, ...(meta ?? {}) };
    this.logger.warn(message, merged);
  }

  /** Logs a `debug` level message with optional metadata */
  debug(message: string, meta?: Record<string, unknown>) {
    const merged = { service: this.context ?? process.env.APPLICATION_NAME, ...(meta ?? {}) };
    this.logger.debug(message, merged);
  }
}
