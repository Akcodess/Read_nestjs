import { LogAppender } from "./../../dtos/logger.model";

export class RateMeter {
  enableConsoleLog!: boolean;
  enableServerLogging!: boolean;
  title!: string;
  icon!: string;
  interval!: number;
  enabled!: boolean;
  environments!: string[];
  apis!: RateMeterApis;
  filters!: string[];
  sortby!: string;
  logAppender!: LogAppender;
}

export class RateMeterApis {
  validate!: string;
  signin!: string;
  register!: string;
  registerSvc!: string;
  dark!: string;
  aops!: string;
  aopsproperties!: string;
  log!: string;
  fetch!: string;
}