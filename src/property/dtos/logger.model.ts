import { LogLevel, LogType } from "./../../common/enums/logger.enum";

export class LogAppender {
    rollingFileAppender!: RollingFileAppender;
    consoleAppender!: ConsoleAppender;
}

export class RollingFileAppender {
    type!: string;
    filename!: string;
    maxLogSize!: number;
    backups!: number;
    compress!: boolean;
    layout!: AppenderLayout;
}

export class ConsoleAppender {
    enabled!: boolean;
    type!: string;
    layout!: AppenderLayout;
}

export class AppenderLayout {
    type!: string;
    pattern!: string;
}
export class LogStack {
    method!: string;
    relativePath!: string;
    line!: string;
    pos!: string;
    file!: string;
    stack!: string;
}

export class LogFormat {
    level!: string;
    message!: string;
    timestamp!: string;
    metadata!: any;
}

export class LogConfig {
    type!: LogType;
    options!: LogOptions;
    customFormat: boolean = true;
}

export class LogOptions {
    console!: ConsoleLogOptions;
    file!: FileLogOptions;
}

export class ConsoleLogOptions {
    level: string = LogLevel.debug;
    handleexceptions: boolean = true;
    json: boolean = false;
    colorize: boolean = true;
    eol: string = '\n\n';
}

export class FileLogOptions {
    level: string = LogLevel.debug;
    filename!: string;
    handleexceptions: boolean = true;
    json: boolean = false;
    maxsize!: number;
    maxfiles!: number;
    colorize: boolean = false;
    timestamp: boolean = true;
    eol: string = '\n\n';
}