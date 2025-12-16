import { LogAppender } from "./../logger.model";

export class QueueStatus {
  enableConsoleLog!: boolean;
  enableServerLogging!: boolean;
  title!: string;
  icon!: string;
  interval!: number;
  enabled!: boolean;
  environments!: string[];
  filters!: string[];
  apis!: QueueStatusApis;
  logAppender!: LogAppender;
}

export class QueueStatusApis {
  register!: string;
  signin!: string;
  validate!: string;
  registerSvc!: string;
  fetch!: string;
  log!: string;
  encode!: string;
  decode!: string;
}

export class QueueStatusNotification {
  duration: number = 5;
  message!: string;
}

export class QueueAgentStatus {
  enableConsoleLog!: boolean;
  enableServerLogging!: boolean;
  title!: string;
  icon!: string;
  interval!: number;
  enabled!: boolean;
  environments!: string[];
  filters!: string[];
  agentStates!: any;
  apis!: QueueAgentStatusApis;
  logAppender!: LogAppender;
}

export class QueueAgentStatusApis {
  register!: string;
  validate!: string;
  signin!: string;
  registerSvc!: string;
  fetch!: string;
  log!: string;
}

export class QueueInteractionStatus {
  enableConsoleLog!: boolean;
  enableServerLogging!: boolean;
  title!: string;
  icon!: string;
  interval!: number;
  enabled!: boolean;
  environments!: string[];
  filters!: string[];
  agentStates!: any;
  apis!: QueueInteractionStatusApis;
  logAppender!: LogAppender;
}

export class QueueInteractionStatusApis {
  register!: string;
  validate!: string;
  signin!: string;
  registerSvc!: string;
  fetch!: string;
  log!: string;
}