import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import chalk from 'chalk';
import { Logger } from '@nestjs/common';
const logger = new Logger('PrismaService');
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
    logger.log(chalk.green('Prisma connected ✅'));
  }

  async onModuleDestroy() {
    await this.$disconnect();
    logger.log(chalk.red('Prisma disconnected ❌'));
  }
}
