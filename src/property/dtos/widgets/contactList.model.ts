import { LogAppender } from "./../../dtos/logger.model";

export class ContactListStatus {
  enableConsoleLog!: boolean;
  enableServerLogging!: boolean;
  title!: string;
  icon!: string;
  interval!: number;
  enabled!: boolean;
  environments!: string[];
  filters!: string[];
  sortby!: string;
  apis!: ContactListStatusApis;
  logAppender!: LogAppender;
}

export class ContactListStatusApis {
  register!: string;
  validate!: string;
  signin!: string;
  registerSvc!: string;
  fetch!: string;
  log!: string;
  dark!: string;
  fetchAOPs!: string;
  fetchAOPsProperties!: string;
  realmRegister!: string;
  realmFetchContactListSummary!: string;
}