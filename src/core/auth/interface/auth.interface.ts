export interface IAuthUser {
  identifier: string;
  id: string;
  identification?: string;
}

export interface ITokenPayload {
  identifier: string;
  sub: string;
  iat?: Date;
  exp?: Date;
  identification: string;
}

export interface IRefreshTokenPayload {
  sub: string;
  iat?: Date;
  exp?: Date;
  identification: string;
}
