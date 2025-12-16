export type GravityHeaders = {
  'Content-Type': string;
  access_token?: string;
  req_id?: number;
} & Record<string, string | number | undefined>;

export interface RegisterPayload {
  access_token: string;
  role: string;
  tenant_code: string;
}

export interface GravityApiResponse {
  RespType?: 'Success' | 'Failed' | string;
  EvType?: 'Success' | 'Failed' | string;
  [key: string]: unknown;
}

export type AopsId = string | number;
export type AopsName = string;
export type Limit = number;
export type Offset = number;


