import { LogAppender } from "./../../dtos/logger.model";

export class CampaignStatus {
  enableConsoleLog!: boolean;
  enableServerLogging!: boolean;
  title!: string;
  icon!: string;
  interval!: number;
  enabled!: boolean;
  environments!: string[];
  filters!: string[];
  sortby!: any;
  states!: any;
  apis!: CampaignStatusApis;
  logAppender!: LogAppender;
}

export class CampaignStatusApis {
  register!: string;
  validate!: string;
  signin!: string;
  registerSvc!: string;
  fetch!: string;
  log!: string;
}

export class CampaignSummary {
  enableConsoleLog!: boolean;
  enableServerLogging!: boolean;
  title!: string;
  icon!: string;
  interval!: number;
  enabled!: boolean;
  enableLabelLine!: boolean;
  environments!: string[];
  filters!: string[];
  states!: any;
  apis!: CampaignSummaryApis;
  logAppender!: LogAppender;
}

export class CampaignSummaryApis {
  register!: string;
  validate!: string;
  signin!: string;
  registerSvc!: string;
  fetch!: string;
  log!: string;
}

export class CampaignSessionSummary {
  enableConsoleLog!: boolean;
  enableServerLogging!: boolean;
  title!: string;
  icon!: string;
  interval!: number;
  enabled!: boolean;
  environments!: string[];
  filters!: string[];
  states!: any;
  apis!: CampaignSessionSummaryApis;
  logAppender!: LogAppender;
}

export class CampaignSessionSummaryApis {
  fetch!: string;
  validate!: string;
  signin!: string;
  log!: string;
}

export class CampaignDispositionSummary {
  enableConsoleLog!: boolean;
  enableServerLogging!: boolean;
  title!: string;
  icon!: string;
  interval!: number;
  enabled!: boolean;
  environments!: string[];
  filters!: string[];
  states!: any;
  apis!: CampaignDispositionSummaryApis;
  logAppender!: LogAppender;
}

export class CampaignDispositionSummaryApis {
  validate!: string;
  signin!: string;
  fetch!: string;
  log!: string;
}