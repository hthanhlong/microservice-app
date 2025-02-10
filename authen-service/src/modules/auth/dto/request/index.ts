import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignInDto {
  @IsEmail()
  @MaxLength(128)
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(128)
  password: string;
}

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  name: string;

  @IsEmail()
  @MaxLength(128)
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(128)
  password: string;

  @MaxLength(10)
  @MinLength(10)
  phone: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(1000)
  address: string;
}
