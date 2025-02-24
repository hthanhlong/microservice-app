import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setup } from './setup';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const logger = new Logger('AuthenticationService');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setup(app);
  await app.startAllMicroservices();
  const configService = app.get(ConfigService);
  await app.listen(configService.get<number>('APP_PORT') ?? 3002);
  logger.log(
    `Authentication service is running on port ${configService.get<number>('APP_PORT')}`,
  );
}

bootstrap().catch((error) => {
  logger.error('Failed to start application:', error);
  process.exit(1);
});
