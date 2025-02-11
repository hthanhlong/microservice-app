export enum ErrorCode {
  NONE = 0,
  NOT_FOUND = 11028,
  BAD_REQUEST = 10543,
  EMAIL_PASSWORD_EXISTED = 83478,
  INTERNAL_SERVER_ERROR = 10000,
}

export enum SubscriptionType {
  BASIC = 'BASIC',
  PREMIUM = 'PREMIUM',
}

export enum Role {
  USER = 'USER',
  VENDOR = 'VENDOR',
}
