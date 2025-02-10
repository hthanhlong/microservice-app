import { Module, Global } from '@nestjs/common';
import { RedisService } from './redis.service';

@Global() //  mark this module as global
@Module({
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
