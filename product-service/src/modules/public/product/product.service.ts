import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../internal/prisma/prisma.service';
import { Product } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async getProducts() {
    return this.prisma.product.findMany();
  }

  async getProductById(id: number) {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  async createProduct(product: Product) {
    return this.prisma.product.create({
      data: product,
    });
  }
}
