import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const AUTHENTICATION_SERVICE_PORT = 3001;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(AUTHENTICATION_SERVICE_PORT);
}

bootstrap().catch((error) => {
  console.error('Failed to start application:', error);
  process.exit(1);
});
