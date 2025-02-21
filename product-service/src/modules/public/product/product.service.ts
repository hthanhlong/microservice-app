import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/internal/prisma/prisma.service';
import { ProductResponseDto } from './dto/response';
import { IErrorRes } from 'src/common/classes';
import { ErrorCode } from 'src/common/enum';
import { mapResponseToDto } from 'src/common/helper';
import { CreateProductDto } from './dto/request';
@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async getProducts(): Promise<ProductResponseDto[] | IErrorRes> {
    const products = await this.prisma.product.findMany();
    if (!products) {
      return new IErrorRes(ErrorCode.NOT_FOUND);
    }
    return products.map((product) =>
      mapResponseToDto(product, ProductResponseDto),
    );
  }

  async getProductById(id: number): Promise<ProductResponseDto | IErrorRes> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!product) {
      return new IErrorRes(ErrorCode.NOT_FOUND);
    }
    return mapResponseToDto(product, ProductResponseDto);
  }

  async createProduct(
    product: CreateProductDto,
  ): Promise<ProductResponseDto | IErrorRes> {
    const newProduct = await this.prisma.product.create({
      data: {
        name: product.name,
        price: product.price,
        description: product.description,
        images: {
          create: product.images.map((image) => ({
            url: image,
            image: image,
          })),
        },
        vendorId: product.vendorId,
      },
    });
    if (!newProduct) {
      return new IErrorRes(ErrorCode.NOT_FOUND);
    }
    return mapResponseToDto(newProduct, ProductResponseDto);
  }
}
