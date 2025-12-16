import { LogAppender } from "./../../dtos/logger.model";
import { DarkServer } from "../server.model";

export class TeamStatus {
  darkServer!: DarkServer;
  enableConsoleLog!: boolean;
  enableServerLogging!: boolean;
  title!: string;
  icon!: string;
  interval!: number;
  enabled!: boolean;
  environments!: string[];
  filters!: string[];
  states!: any;
  apis!: TeamStatusApis;
  logAppender!: LogAppender;
}

export class TeamStatusApis {
  // cc!: TeamStatusCCApis;
  // rt!: TeamStatusRTApis;
  // log!: string;

  validate!: string;
  signin!: string;
  register!: string;
  registerSvc!: string;
  fetch!: string;
  log!: string;
}

export class TeamStatusCCApis {
  validate!: string;
  signin!: string;
  register!: string;
  login!: string;
  fetch!: string;
}

export class TeamStatusRTApis {
  register!: string;
  validate!: string;
  signin!: string;
  registerSvc!: string;
  fetch!: string;
}