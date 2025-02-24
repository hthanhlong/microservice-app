import {
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
  Logger,
} from '@nestjs/common';
import Redis from 'ioredis';
import chalk from 'chalk';
import { ConfigService } from '@nestjs/config';

const logger = new Logger('RedisService');
@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: Redis;

  constructor(private readonly configService: ConfigService) {
    this.client = new Redis({
      host: this.configService.get<string>('REDIS_HOST'),
      port: this.configService.get<number>('REDIS_PORT'),
    });

    this.client.on('connect', () => {
      logger.log(chalk.green('Redis connected ✅'));
    });

    this.client.on('error', (err) => {
      logger.error(chalk.red('Redis error ❌', err));
    });
  }

  onModuleInit() {
    logger.log(chalk.green('RedisService initialized ✅'));
  }

  // set public key
  async setPublicKey(key: string, value: string, ttl?: number) {
    return this.set(key, value, ttl);
  }
  // get public key
  async getPublicKey(key: string) {
    return this.get(key);
  }

  async set(key: string, value: string, ttl?: number) {
    if (ttl) {
      return await this.client.set(key, value, 'EX', ttl);
    }
    return await this.client.set(key, value);
  }

  async get(key: string) {
    return await this.client.get(key);
  }

  async del(key: string) {
    return await this.client.del(key);
  }

  async onModuleDestroy() {
    await this.client.quit();
  }
}
