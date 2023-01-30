import {
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export enum EOTPTYPE {
  LOGIN = 'login',
  FORGET_PASSWORD = 'forget_password',
  DEACTIVATEUSERPROFILE = 'deactivate_user_profile',
  ACTIVATEUSERPROFILE = 'activate_user_profile',
}

export interface IOTP {
  otp: string;
  type: EOTPTYPE;
}

export class VerifyOtpDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  identifier: string;
  @IsEnum(EOTPTYPE)
  @IsNotEmpty()
  type: EOTPTYPE;
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(10)
  otp: string;
}

export class InternalVerifyOtpDTO {
  @IsEnum(EOTPTYPE)
  @IsNotEmpty()
  type: EOTPTYPE;
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(10)
  otp: string;
}
