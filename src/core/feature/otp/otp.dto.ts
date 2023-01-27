export enum EOTPTYPE {
  LOGIN = 'login',
  FORGET_PASSWORD = 'forget_password',
}

export interface IOTP {
  otp: string;
  type: EOTPTYPE;
}
