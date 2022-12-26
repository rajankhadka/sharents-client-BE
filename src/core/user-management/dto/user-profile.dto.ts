import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
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
