import { LogAppender } from "./../../dtos/logger.model";

export class ChatStatus {
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
  apis!: ChatStatusApis;
  logAppender!: LogAppender;
}

export class ChatStatusApis {
  register!: string;
  validate!: string;
  signin!: string;
  registerSvc!: string;
  fetch!: string;
  log!: string;
}

export class ChatSummary {
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
  apis!: ChatSummaryApis;
  logAppender!: LogAppender;
}

export class ChatSummaryApis {
  register!: string;
  validate!: string;
  signin!: string;
  registerSvc!: string;
  fetch!: string;
  log!: string;
}