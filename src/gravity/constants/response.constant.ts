export const gravityResponse = {
  Success: 'Success',
  Failed: 'Failed',
  AuthenticationSuccess: 'AuthenticationSuccess',
  AuthenticationFailed: 'AuthenticationFailed',
} as const;

export type GravityResponseStatus = typeof gravityResponse[keyof typeof gravityResponse];

