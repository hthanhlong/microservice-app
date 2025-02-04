import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const EMAIL_SERVICE_PORT = 3002;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(EMAIL_SERVICE_PORT);
}

bootstrap().catch((error) => {
  console.error('Failed to start application:', error);
  process.exit(1);
});
