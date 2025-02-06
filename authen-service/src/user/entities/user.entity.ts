import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
  IsDate,
} from 'class-validator';

export class UserEntity {
  @IsNumber()
  id: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  email: string;

  @IsString()
  @MaxLength(64)
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  hashedPassword: string;

  @IsString()
  @MaxLength(4)
  @MinLength(4)
  @IsNotEmpty()
  salt: string;

  @IsString()
  @MaxLength(6)
  @MinLength(6)
  @IsNotEmpty()
  verifyCode: string;

  @IsBoolean()
  isVerified: boolean;

  @IsString()
  @MaxLength(10)
  @MinLength(10)
  @IsNotEmpty()
  Phone: string;

  @IsString()
  @IsNotEmpty()
  Address: string;

  @IsBoolean()
  IsDeleted: boolean;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
