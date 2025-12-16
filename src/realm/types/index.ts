export type RealmHeaders = {
  'Content-Type': string;
  'X-Api-Key'?: string;
} & Record<string, string | number | undefined>;

export interface RealmRegisterPayload {
  Token: string;
}

export interface RealmApiResponse {
  RespType?: 'Success' | 'Failed' | string;
  EvType?: 'Success' | 'Failed' | string;
  [key: string]: unknown;
}

