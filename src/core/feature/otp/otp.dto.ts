export enum EOTPTYPE {
  LOGIN = 'login',
  FORGET_PASSWORD = 'forget_password',
}

export interface IOTP {
  otp: string;
  type: EOTPTYPE;
}

export class VerifyOtp {
  identifier: string;
  type: EOTPTYPE;
  otp: string;
}
