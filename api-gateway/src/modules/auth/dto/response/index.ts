import { Expose } from 'class-transformer';

export class SignInResponseDto {
  @Expose()
  accessToken: string;

  @Expose()
  refreshToken: string;
}

export class SignUpResponseDto {
  @Expose()
  accessToken: string;

  @Expose()
  refreshToken: string;
}

export class SignUpVendorResponseDto {
  @Expose()
  uuid: string;

  @Expose()
  businessName: string;

  @Expose()
  businessAddress: string;

  @Expose()
  businessLicense: string;
}
