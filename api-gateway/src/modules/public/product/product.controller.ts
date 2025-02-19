import { Controller } from '@nestjs/common';
import { ProductService } from './product.service';
@Controller({
  version: '1',
  path: 'product',
})
export class ProductController {
  constructor(private readonly productService: ProductService) {}
}
