import { LogAppender } from "./../../dtos/logger.model";

export class VideoStatus {
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
  apis!: VideoStatusApis;
  logAppender!: LogAppender;
}

export class VideoStatusApis {
  validate!: string;
  signin!: string;
  register!: string;
  registerSvc!: string;
  fetch!: string;
  log!: string;
}

export class VideoSummary {
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
  apis!: VideoSummaryApis;
  logAppender!: LogAppender;
}

export class VideoSummaryApis {
  register!: string;
  validate!: string;
  signin!: string;
  registerSvc!: string;
  fetch!: string;
  log!: string;
}