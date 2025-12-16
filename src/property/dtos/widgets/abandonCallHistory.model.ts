import { LogAppender } from "./../logger.model";

export class AbandonCallHistory {
  enableConsoleLog!: boolean;
  title!: string;
  icon!: string;
  interval!: number;
  enabled!: boolean;
  environments!: string[];
  apis!: AbandonCallHistoryApis;
  logAppender!: LogAppender;
}

export class AbandonCallHistoryApis {
  validate!: string;
  signin!: string;
  register!: string;
  fetch!: string;
  log!: string;
}