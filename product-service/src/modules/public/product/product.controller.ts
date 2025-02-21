import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from '@prisma/client';
@Controller({
  version: '1',
  path: 'product',
})
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts() {
    return this.productService.getProducts();
  }

  @Get(':id')
  async getProductById(@Param('id') id: number) {
    return this.productService.getProductById(id);
  }

  @Post()
  async createProduct(@Body() product: Product) {
    return this.productService.createProduct(product);
  }
}
