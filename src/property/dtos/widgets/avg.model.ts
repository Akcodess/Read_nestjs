import { LogAppender } from "./../../dtos/logger.model";

export class AverageHandleSummary {
    enableConsoleLog!: boolean;
    enableServerLogging!: boolean;
    title!: string;
    icon!: string;
    interval!: number;
    enabled!: boolean;
    environments!: string[];
    filters!: string[];
    types!: any;
    states!: any;
    apis!: AverageHandleSummaryApis;
    logAppender!: LogAppender;
}

export class AverageHandleSummaryApis {
    signin!: string;
    validate!: string;
    fetch!: string;
    log!: string;
}

export class AverageHandleSummaryLive {
    enableConsoleLog!: boolean;
    enableServerLogging!: boolean;
    title!: string;
    icon!: string;
    interval!: number;
    enabled!: boolean;
    environments!: string[];
    filters!: string[];
    types!: any;
    states!: any;
    apis!: AverageHandleSummaryLiveApis;
    logAppender!: LogAppender;
}

export class AverageHandleSummaryLiveApis {
    signin!: string;
    validate!: string;
    fetch!: string;
    log!: string;
}

export class AverageSpeedOfAnswer {
    enableConsoleLog!: boolean;
    enableServerLogging!: boolean;
    title!: string;
    icon!: string;
    interval!: number;
    enabled!: boolean;
    environments!: string[];
    filters!: string[];
    types!: any;
    states!: any;
    apis!: AverageSpeedOfAnswerApis;
    logAppender!: LogAppender;
}

export class AverageSpeedOfAnswerApis {
    signin!: string;
    validate!: string;
    fetch!: string;
    log!: string;
}