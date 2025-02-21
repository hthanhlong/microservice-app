import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResponseDto } from './dto/response';
import { IErrorRes } from 'src/common/classes';
import { CreateProductDto } from './dto/request';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProducts(): Promise<ProductResponseDto[] | IErrorRes> {
    return this.productService.getProducts();
  }

  @Get(':id')
  async getProductById(
    @Param('id') id: number,
  ): Promise<ProductResponseDto | IErrorRes> {
    return this.productService.getProductById(id);
  }

  @Post()
  async createProduct(
    @Body() product: CreateProductDto,
  ): Promise<ProductResponseDto | IErrorRes> {
    return this.productService.createProduct(product);
  }
}
