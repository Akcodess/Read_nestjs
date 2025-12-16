export const nucleusResponse = {
  Success: 'Success',
  AuthenticationSuccess: 'AuthenticationSuccess',
  Failed: 'Failed',
  AuthenticationFailed: 'AuthenticationFailed',
} as const;

export type NucleusResponseStatus = typeof nucleusResponse[keyof typeof nucleusResponse];

