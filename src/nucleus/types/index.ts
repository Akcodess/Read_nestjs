export type NucleusHeaders = {
  'Content-Type': string;
  'Authorization'?: string;
} & Record<string, string | number | undefined>;

export type AuthType = 'Password' | 'OTP' | string;
export type UserRole = string;

export interface SigninPayload {
  LoginId: string;
  Password: string;
  AuthorizeBy: AuthType;
}

export interface ValidatePayload {
  grant_type: 'authorization_code';
  auth_code: string;
  role: UserRole;
}

export interface NucleusAuthResponse {
  EvCode?: string;
  EvCodeApp?: string;
  [key: string]: unknown;
}

export interface NucleusTokenResponse {
  EvCodeApp?: string;
  EvCode?: string;
  access_token?: string;
  refresh_token?: string;
  expires_in?: number;
  [key: string]: unknown;
}
