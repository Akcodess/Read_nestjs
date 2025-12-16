import { LogAppender } from "../logger.model";

export class WebFormStatus {
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
  apis!: WebFormStatusApis;
  logAppender!: LogAppender;
}

export class WebFormStatusApis {
  validate!: string;
  signin!: string;
  register!: string;
  registerSvc!: string;
  fetch!: string;
  log!: string;
}

export class WebFormSummary {
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
  apis!: WebFormSummaryApis;
  logAppender!: LogAppender;
}

export class WebFormSummaryApis {
  register!: string;
  validate!: string;
  signin!: string;
  registerSvc!: string;
  fetch!: string;
  log!: string;
}