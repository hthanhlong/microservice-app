import { IsEmail, MinLength, MaxLength, IsString } from 'class-validator';

export class SignUpDto {
  @IsString()
  @MaxLength(128)
  name: string;

  @IsEmail()
  @MaxLength(128)
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(128)
  password: string;
}
