import {
  IsDefined,
  IsNotEmpty,
  IsEmail,
  IsString,
  MinLength,
} from 'class-validator';

export class SignUpDto {
  @IsDefined()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}
