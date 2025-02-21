export enum ErrorCode {
  NONE = 0,
  NOT_FOUND = 11028,
  BAD_REQUEST = 10543,
  EMAIL_PASSWORD_EXISTED = 83478,
  INTERNAL_SERVER_ERROR = 10000,
  REFRESH_TOKEN_REQUIRED = 10001,
}

export enum SubscriptionType {
  BASIC = 'BASIC',
  PREMIUM = 'PREMIUM',
}

export enum Role {
  USER = 'USER',
  VENDOR = 'VENDOR',
}

export enum ErrorMessage {
  EMAIL_PASSWORD_EXISTED = 'Email or password already exists',
  REFRESH_TOKEN_REQUIRED = 'Refresh token is required',
  GOOGLE_SIGN_IN_FAILED = 'Google sign in failed',
  SIGN_IN_FAILED = 'Sign in failed',
  SIGN_UP_FAILED = 'Sign up failed',
  GOOGLE_SIGN_IN_SUCCESS = 'Google sign in successfully',
  SIGN_IN_SUCCESS = 'Sign in successfully',
  SIGN_UP_SUCCESS = 'Sign up successfully',
  TOKEN_REFRESHED = 'Token refreshed',
  TOKEN_REFRESH_FAILED = 'Token refresh failed',
  LOGOUT_SUCCESS = 'Logout successfully',
  SIGN_UP_VENDOR_FAILED = 'Sign up vendor failed',
  SIGN_UP_VENDOR_SUCCESS = 'Sign up vendor successfully',
  VERIFY_CODE_FAILED = 'Verify code failed',
  VERIFY_CODE_SUCCESS = 'Verify code successfully',
}
