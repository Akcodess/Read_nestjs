import { LogAppender } from "./../logger.model";

export class RealtimeSentiment {
    enableConsoleLog!: boolean;
    enableServerLogging!: boolean;
    title!: string;
    icon!: string;
    interval!: number;
    enabled!: boolean;
    environments!: string[];
    apis!: RealtimeSentimentApis;
    logAppender!: LogAppender;
}

export class RealtimeSentimentApis {
    signin!: string;
    validate!: string;
    register!: string;
    registerSvc!: string;
    dark!: string;
    aops!: string;
    aopsproperties!: string;
    log!: string;
    fetch!: string;
}