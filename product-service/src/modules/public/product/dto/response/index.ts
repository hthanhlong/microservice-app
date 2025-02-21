import { Expose } from 'class-transformer';

export class ProductResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  price: number;

  @Expose()
  description: string;

  @Expose()
  images: string[];

  @Expose()
  vendorId: string;
}
