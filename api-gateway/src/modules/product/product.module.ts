import { Module } from '@nestjs/common';
import { KafkaModule } from '../kafka/kafka.module';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [KafkaModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
