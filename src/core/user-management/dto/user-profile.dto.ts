import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { EOTPTYPE } from 'src/core/feature/otp/otp.dto';
import { IsValidRePassword } from 'src/decorator/check-repassword.decorator';

export class CreateUserProfileDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @MinLength(3)
  firstName: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  @MinLength(3)
  middleName?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @MinLength(3)
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @MinLength(3)
  userName: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  @MinLength(10)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(15)
  @MinLength(10)
  @IsPhoneNumber('NP')
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(16)
  @MinLength(8)
  @Matches(
    /(?=^.{8,16}$)(?=.*\d+)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z]+)(?=.*[a-z]+).*$/,
    { message: '1 upper case, 1 lower case, 1 special character, 1 digit' },
  )
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsValidRePassword()
  rePassword: string;
}

export class UpdateUserProfileDto {
  @IsString()
  @IsOptional()
  @MaxLength(50)
  @MinLength(3)
  firstName: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  @MinLength(3)
  middleName?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  @MinLength(3)
  lastName: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  @MinLength(3)
  userName: string;

  @IsString()
  @IsOptional()
  @MaxLength(15)
  @MinLength(10)
  @IsPhoneNumber('NP')
  phoneNumber: string;
}

export class UpdateUserProfilePasswordDto {
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(16)
  @MinLength(8)
  @Matches(
    /(?=^.{8,16}$)(?=.*\d+)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z]+)(?=.*[a-z]+).*$/,
    { message: '1 upper case, 1 lower case, 1 special character, 1 digit' },
  )
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsValidRePassword()
  rePassword: string;
}

export class ForgetPasswordOtpDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(25)
  @MinLength(3)
  identifier: string;
}

export class ForgetPasswordDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  identifier: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(16)
  @MinLength(8)
  @Matches(
    /(?=^.{8,16}$)(?=.*\d+)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z]+)(?=.*[a-z]+).*$/,
    { message: '1 upper case, 1 lower case, 1 special character, 1 digit' },
  )
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsValidRePassword()
  rePassword: string;
}
