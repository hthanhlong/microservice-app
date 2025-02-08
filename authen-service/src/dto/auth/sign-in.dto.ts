import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class SignInDto {
  @IsEmail()
  @MaxLength(128)
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(128)
  password: string;
}
