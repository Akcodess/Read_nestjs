import { LogAppender } from "../logger.model";

export class VisitStatus {
  enableConsoleLog!: boolean;
  enableServerLogging!: boolean;
  title!: string;
  icon!: string;
  interval!: number;
  enabled!: boolean;
  environments!: string[];
  filters!: string[];
  sortby!: string;
  types!: any;
  apis!: VisitStatusApis;
  logAppender!: LogAppender;
}

export class VisitStatusApis {
  validate!: string;
  signin!: string;
  register!: string;
  registerSvc!: string;
  fetch!: string;
  log!: string;
}

export class VisitSummary {
  enableConsoleLog!: boolean;
  enableServerLogging!: boolean;
  title!: string;
  icon!: string;
  interval!: number;
  enabled!: boolean;
  enableLabelLine!: boolean;
  environments!: string[];
  filters!: string[];
  types!: any;
  apis!: VisitSummaryApis;
  logAppender!: LogAppender;
}

export class VisitSummaryApis {
  register!: string;
  validate!: string;
  signin!: string;
  registerSvc!: string;
  fetch!: string;
  log!: string;
}