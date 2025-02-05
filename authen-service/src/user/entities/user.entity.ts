import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class User {
  @IsNumber()
  id: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  email: string;

  @IsString()
  @MaxLength(64)
  name: string;

  @IsString()
  hashedPassword: string;

  @IsString()
  @MaxLength(4)
  @MinLength(4)
  @IsNotEmpty()
  salt: string;

  @IsString()
  verifyCode: string;

  @IsBoolean()
  isVerified: boolean;

  @IsString()
  @MaxLength(10)
  @MinLength(10)
  Phone: string;

  @IsString()
  Address: string;

  @IsBoolean()
  IsDeleted: boolean;
}
