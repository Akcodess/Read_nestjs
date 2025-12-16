import { LogAppender } from "../logger.model";

export class SysDispositionSummary {
    enableConsoleLog!: boolean;
    enableServerLogging!: boolean;
    title!: string;
    icon!: string;
    interval!: number;
    enabled!: boolean;
    enableLabelLine!: boolean;
    sysDispositions!: string[];
    environments!: string[];
    filters!: string[];
    states!: any;
    types!: any;
    apis!: SysDispositionSummaryApis;
    logAppender!: LogAppender;
}

export class SysDispositionSummaryApis {
    signin!: string;
    validate!: string;
    fetch!: string;
    log!: string;
}

export class UserDispositionGrid {
    enableConsoleLog!: boolean;
    enableServerLogging!: boolean;
    title!: string;
    icon!: string;
    interval!: number;
    enabled!: boolean;
    environments!: string[];
    filters!: string[];
    states!: any;
    apis!: UserDispositionGridApis;
    logAppender!: LogAppender;
}

export class UserDispositionGridApis {
    signin!: string;
    validate!: string;
    fetch!: string;
    log!: string;
}

export class UserDispositionSummary {
    enableConsoleLog!: boolean;
    enableServerLogging!: boolean;
    title!: string;
    icon!: string;
    interval!: number;
    enabled!: boolean;
    enableLabelLine!: boolean;
    environments!: string[];
    filters!: string[];
    states!: any;
    apis!: UserDispositionSummaryApis;
    logAppender!: LogAppender;
}

export class UserDispositionSummaryApis {
    signin!: string;
    validate!: string;
    fetch!: string;
    log!: string;
}