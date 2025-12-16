import { DarkServer } from "./../../dtos/server.model";
import { LogAppender } from "./../../dtos/logger.model";

export class AgentStatus {
  enableConsoleLog!: boolean;
  enableServerLogging!: boolean;
  title!: string;
  icon!: string;
  interval!: number;
  enabled!: boolean;
  environments!: string[];
  filters!: string[];
  states!: any;
  sortby!: any;
  apis!: AgentStatusApis;
  logAppender!: LogAppender;
}

export class AgentStatusApis {
  validate!: string;
  signin!: string;
  register!: string;
  registerSvc!: string;
  fetch!: string;
  log!: string;
}

export class AgentSummary {
  enableConsoleLog!: boolean;
  title!: string;
  icon!: string;
  interval!: number;
  enabled!: boolean;
  enableLabelLine!: boolean;
  environments!: string[];
  filters!: string[];
  states!: any;
  apis!: AgentSummaryApis;
  logAppender!: LogAppender;
}

export class AgentSummaryApis {
  register!: string;
  validate!: string;
  signin!: string;
  registerSvc!: string;
  fetch!: string;
  log!: string;
}

export class AgentSummaryChannelWise {
  enableConsoleLog!: boolean;
  title!: string;
  icon!: string;
  interval!: number;
  enabled!: boolean;
  environments!: string[];
  filters!: string[];
  states!: any;
  apis!: AgentSummaryChannelWiseApis;
  logAppender!: LogAppender;
}

export class AgentSummaryChannelWiseApis {
  register!: string;
  validate!: string;
  signin!: string;
  registerSvc!: string;
  fetch!: string;
  log!: string;
}

export class AgentSelfSessionActivitySummary {
  enableConsoleLog!: boolean;
  enableServerLogging!: boolean;
  title!: string;
  icon!: string;
  interval!: number;
  enabled!: boolean;
  environments!: string[];
  filters!: string[];
  states!: any;
  sortby!: any;
  apis!: AgentSelfSessionActivitySummaryApis;
}

export class AgentSelfSessionActivitySummaryApis {
  validate!: string;
  signin!: string;
  register!: string;
  login!: string;
  registerSvc!: string;
  fetch!: string;
  log!: string;
}

export class TotalAgents {
  enableConsoleLog!: boolean;
  enableServerLogging!: boolean;
  title!: string;
  icon!: string;
  interval!: number;
  enabled!: boolean;
  environments!: string[];
  filters!: string[];
  types!: any;
  states!: any;
  apis!: TotalAgentsApis;
  logAppender!: LogAppender;
}

export class TotalAgentsApis {
  signin!: string;
  validate!: string;
  register!: string;
  login!: string;
  registerSvc!: string;
  fetch!: string;
  log!: string;
}
export class AgentAOPsStatus {
  enableConsoleLog!: boolean;
  enableServerLogging!: boolean;
  title!: string;
  icon!: string;
  interval!: number;
  enabled!: boolean;
  environments!: string[];
  filters!: string[];
  states!: any;
  sortby!: any;
  apis!: AgentAOPsStatusApis;
  logAppender!: LogAppender;
}

export class AgentAOPsStatusApis {
  validate!: string;
  signin!: string;
  register!: string;
  registerSvc!: string;
  fetch!: string;
  log!: string;
}