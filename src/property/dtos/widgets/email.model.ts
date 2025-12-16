import { LogAppender } from "./../../dtos/logger.model";

export class EmailStatus {
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
  apis!: EmailStatusApis;
  logAppender!: LogAppender;
}

export class EmailStatusApis {
  validate!: string;
  signin!: string;
  register!: string;
  registerSvc!: string;
  fetch!: string;
  log!: string;
}

export class EmailSummary {
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
  apis!: EmailSummaryApis;
  logAppender!: LogAppender;
}

export class EmailSummaryApis {
  register!: string;
  validate!: string;
  signin!: string;
  registerSvc!: string;
  fetch!: string;
  log!: string;
}