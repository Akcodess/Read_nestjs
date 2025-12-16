import { LogAppender } from "./../logger.model";


export class CallStatus {
  enableConsoleLog!: boolean;
  title!: string;
  icon!: string;
  interval!: number;
  enabled!: boolean;
  environments!: string[];
  filters!: string[];
  sortby!: any;
  types!: any;
  apis!: CallStatusApis;
  logAppender!: LogAppender;
}

export class CallStatusApis {
  register!: string;
  validate!: string;
  registerSvc!: string;
  fetch!: string;
  signin!: string;
  log!: string;
}

export class CallSummary {
  enableConsoleLog!: boolean;
  title!: string;
  icon!: string;
  interval!: number;
  enabled!: boolean;
  enableLabelLine!: boolean;
  environments!: string[];
  filters!: string[];
  types!: any;
  states!: any;
  sortby!: any;
  apis!: CallSummaryApis;
  logAppender!: LogAppender;
}

export class CallSummaryApis {
  register!: string;
  signin!: string;
  validate!: string;
  registerSvc!: string;
  fetch!: string;
  log!: string;
}


export class CallSummaryInbound {
  enableConsoleLog!: boolean;
  title!: string;
  icon!: string;
  interval!: number;
  enabled!: boolean;
  environments!: string[];
  widgetURL!: string;
  apis!: CallSummaryInboundApis;
  logAppender!: LogAppender;
}

export class CallSummaryInboundApis {
  signin!: string;
  validate!: string;
  fetch!: string;
  log!: string;
}


export class CallSummaryCampaignWise {
  enableConsoleLog!: boolean;
  title!: string;
  icon!: string;
  interval!: number;
  enabled!: boolean;
  environments!: string[];
  widgetURL!: string;
  apis!: CallSummaryCampaignWiseApis;
  logAppender!: LogAppender;
}

export class CallSummaryCampaignWiseApis {
  signin!: string;
  validate!: string;
  fetch!: string;
  log!: string;
}

export class CallSummaryQueueWise {
  enableConsoleLog!: boolean;
  title!: string;
  icon!: string;
  interval!: number;
  enabled!: boolean;
  environments!: string[];
  widgetURL!: string;
  apis!: CallSummaryQueueWiseApis;
  logAppender!: LogAppender;
}

export class CallSummaryQueueWiseApis {
  signin!: string;
  validate!: string;
  log!: string;
}

export class CallSummaryProjectWise {
  enableConsoleLog!: boolean;
  title!: string;
  icon!: string;
  interval!: number;
  enabled!: boolean;
  environments!: string[];
  widgetURL!: string;
  apis!: CallSummaryProjectWiseApis;
  logAppender!: LogAppender;
  types!: any;
}

export class CallSummaryProjectWiseApis {
  signin!: string;
  validate!: string;
  fetch!: string;
  log!: string;
}

export class CallAverageSummary {
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
  apis!: CallAverageSummaryApis;
  logAppender!: LogAppender;
}

export class CallAverageSummaryApis {
  signin!: string;
  validate!: string;
  fetch!: string;
  log!: string;
}

export class CallTypeSummary {
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
  sortby!: any;
  apis!: CallTypeSummaryApis;
  logAppender!: LogAppender;
}

export class CallTypeSummaryApis {
  signin!: string;
  validate!: string;
  fetch!: string;
  log!: string;
}

export class ConnectedCallVolumeTrend {
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
  apis!: ConnectedCallVolumeTrendApis;
  logAppender!: LogAppender;
}

export class ConnectedCallVolumeTrendApis {
  signin!: string;
  validate!: string;
  fetch!: string;
  log!: string;
}

export class QueueCallSummary {
  enableConsoleLog!: boolean;
  enableServerLogging!: boolean;
  title!: string;
  icon!: string;
  interval!: number;
  enabled!: boolean;
  environments!: string[];
  types!: any;
  apis!: QueueCallSummaryApis;
  logAppender!: LogAppender;
}

export class QueueCallSummaryApis {
  signin!: string;
  validate!: string;
  fetch!: string;
  log!: string;
}

export class InboundCallOverview {
  enableConsoleLog!: boolean;
  title!: string;
  icon!: string;
  interval!: number;
  enabled!: boolean;
  environments!: string[];
  widgetURL!: string;
  apis!: InboundCallOverviewApis;
  logAppender!: LogAppender;
}

export class InboundCallOverviewApis {
  validate!: string;
  signin!: string;
  fetch!: string;
  log!: string;
}

export class SLA {
  enableConsoleLog!: boolean;
  enableServerLogging!: boolean;
  enableLabelLine!: boolean;
  title!: string;
  icon!: string;
  interval!: number;
  enabled!: boolean;
  environments!: string[];
  filters!: any;
  searchFilters!: any;
  sortby!: any;
  types!: any;
  slaTypes!: any;
  apis!: SLAApis;
  logAppender!: LogAppender;
}

export class SLAApis {
  signin!: string;
  validate!: string;
  fetch!: string;
  log!: string;
}

export class InboundCallStatistics {
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
  states!: any;
  apis!: InboundCallStatisticsApis;
  logAppender!: LogAppender;
}

export class InboundCallStatisticsApis {
  validate!: string;
  signin!: string;
  register!: string;
  login!: string;
  registerSvc!: string;
  fetch!: string;
  log!: string;
}

export class TotalCalls {
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
  apis!: TotalCallsApis;
  logAppender!: LogAppender;
}

export class TotalCallsApis {
  signin!: string;
  validate!: string;
  register!: string;
  login!: string;
  registerSvc!: string;
  fetch!: string;
  log!: string;
}

export class TotalCustomers {
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
  apis!: TotalCustomersApis;
  logAppender!: LogAppender;
}

export class TotalCustomersApis {
  signin!: string;
  validate!: string;
  register!: string;
  login!: string;
  registerSvc!: string;
  fetch!: string;
  log!: string;
}