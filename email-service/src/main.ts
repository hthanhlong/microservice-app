import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
const logger = new Logger('EmailService');

async function bootstrap() {
  const microservice_app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'email-service-group-consumer',
      },
    },
  });
  const http_app = await NestFactory.create(AppModule);

  const configService = http_app.get(ConfigService);
  const EMAIL_SERVICE_PORT = configService.get('APP_PORT') ?? 3003;
  await http_app.listen(EMAIL_SERVICE_PORT as number);
  await microservice_app.listen();
  logger.log(`Email service is running on port ${EMAIL_SERVICE_PORT}`);
}

bootstrap().catch((error) => {
  console.error('Failed to start application:', error);
  process.exit(1);
});
