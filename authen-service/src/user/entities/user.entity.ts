import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsString,
  MaxLength,
  IsDate,
  IsEnum,
} from 'class-validator';

enum SubscriptionType {
  BASIC = 'BASIC',
  PREMIUM = 'PREMIUM',
}

export class UserEntity {
  @IsNumber()
  id: number;

  @IsString()
  uuid: string;

  @IsEmail()
  @MaxLength(128)
  email: string;

  @IsString()
  @MaxLength(128)
  name: string;

  @IsString()
  hashedPassword: string;

  @IsString()
  salt: string;

  @IsString()
  verifyCode: string;

  @IsString()
  @IsEnum(SubscriptionType)
  subscriptionType: string;

  @IsDate()
  expiresAtSub: Date;

  @IsBoolean()
  isVerified: boolean;

  @IsString()
  @MaxLength(20)
  Phone: string;

  @IsString()
  @MaxLength(1000)
  Address: string;

  @IsBoolean()
  IsDeleted: boolean;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
