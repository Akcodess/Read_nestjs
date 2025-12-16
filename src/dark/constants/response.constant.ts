export const darkResponse = {
  Success: 'Success',
  Failed: 'Failed',
} as const;

export type DarkResponseStatus = typeof darkResponse[keyof typeof darkResponse];
