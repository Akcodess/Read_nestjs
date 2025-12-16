export const realmResponse = {
  Success: 'Success',
  Failed: 'Failed',
  AuthenticationSuccess: 'AuthenticationSuccess',
  AuthenticationFailed: 'AuthenticationFailed',
} as const;

export type RealmResponseStatus = typeof realmResponse[keyof typeof realmResponse];

