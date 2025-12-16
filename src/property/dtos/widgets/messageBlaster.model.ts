import { HTTP_METHOD } from "../../../common/enums/http.method.enum";
import { LogAppender } from "./../../dtos/logger.model";

export class MessageBlaster {
  enableConsoleLog!: boolean;
  enableServerLogging!: boolean;
  title!: string;
  icon!: string;
  interval!: number;
  enabled!: boolean;
  environments!: string[];
  filters!: string[];
  apis!: MessageBlasterApis;
  records!: MessageBlasterRecord[];
  logAppender!: LogAppender;
}

export class MessageBlasterApis {
  email!: MessageBlasterEmailApi;
  chat!: MessageBlasterChatApi;
  log!: string;
}

export class MessageBlasterEmailApi {
  url!: string;
  method!: HTTP_METHOD;
}

export class MessageBlasterChatApi {
  url!: string;
  method!: HTTP_METHOD;
}

export class MessageBlasterRecord {
  Name!: string;
  Mobile!: string;
  Email!: string;
  Status!: string;
}