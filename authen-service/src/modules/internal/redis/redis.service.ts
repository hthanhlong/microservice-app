import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  constructor(@Inject('REDIS_SERVICE') private readonly client: Redis) {}

  onModuleInit() {
    this.client.on('ready', () => {
      console.log('Redis connected');
    });
  }

  async set(key: string, value: string, ttl?: number) {
    if (ttl) {
      return this.client.set(key, value, 'EX', ttl);
    }
    return this.client.set(key, value);
  }

  async get(key: string) {
    return this.client.get(key);
  }

  async del(key: string) {
    return this.client.del(key);
  }

  async onModuleDestroy() {
    await this.client.quit();
  }
}
