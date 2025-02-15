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

export class SignInWithGoogleDto {
  @IsString()
  @IsNotEmpty()
  idToken: string;
}

export class SignUpVendorDto {
  @IsString()
  @IsNotEmpty()
  userUuid: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  businessName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  businessAddress: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  businessLicense: string;
}

export class VerifyCodeDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  code: string;
}
