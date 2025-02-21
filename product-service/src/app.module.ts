import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/internal/prisma/prisma.module';
import { ProductModule } from './modules/public/product/product.module';
@Module({
  imports: [PrismaModule, ProductModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
