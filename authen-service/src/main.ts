import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setup } from './setup';
import { Logger } from '@nestjs/common';

const logger = new Logger('AuthenticationService');
const AUTHENTICATION_SERVICE_PORT = 3001;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setup(app);
  await app.startAllMicroservices();
  await app.listen(AUTHENTICATION_SERVICE_PORT);
}

bootstrap().catch((error) => {
  logger.error('Failed to start application:', error);
  process.exit(1);
});
