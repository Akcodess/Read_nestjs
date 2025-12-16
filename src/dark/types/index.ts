export type DarkHeaders = {
  'Content-Type': string;
  access_token?: string;
  req_id?: number;
} & Record<string, string | number | undefined>;

export interface RegisterPayload {
  ReqId: number;
  ReqType: 'Auth';
  ReqCode: 'UserRegister';
  RemoteIP: string;
  AccessToken: string;
  UserRole: string;
  ForceLogoutActiveSessions: boolean;
}

export interface AOPsStatusPayload {
  ReqId: number;
  ReqType: 'Control';
  ReqCode: 'AOPsStatFetch';
  AOPsId: string | number;
}

export interface PredictiveDialerStatusPayload {
  ReqId: number;
  ReqType: 'Control';
  ReqCode: 'PredictiveDialerStatusFetch';
  CampaignId: string | number;
}

export interface DarkApiResponse {
  RespType?: 'Success' | 'Failed' | string;
  EvType?: 'Success' | 'Failed' | string;
  [key: string]: unknown;
}
