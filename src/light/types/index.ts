export type LightServiceEntity = string;

export interface UserRegisterPayload {
  ReqId: number;
  ReqType: 'Auth';
  ReqCode: 'UserRegister';
  AuthToken: string;
  UserRole: string;
  RemoteIP: string;
  Device: string;
  TenantCode: string;
}

export interface RegisterServicePayload {
  ReqId: number;
  ReqType: 'Activity';
  ReqCode: 'RegisterService';
  ServiceName: LightServiceEntity;
}

export interface RegisteredEntityFetchPayload {
  ReqId: number;
  ReqType: 'Activity';
  ReqCode: 'RegisteredEntityFetch';
  TenantCode: string;
  ServiceName: LightServiceEntity;
}

