export interface IAuthUser {
  identifier: string;
  id: string;
}

export interface ITokenPayload {
  identifier: string;
  sub: string;
  iat?: Date;
  exp?: Date;
}
