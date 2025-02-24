import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { Logger } from '@nestjs/common';
const logger = new Logger('ApiGateway');
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
  });
  const configService = app.get(ConfigService);
  app.use(helmet());
  app.use(cookieParser());
  app.enableCors({
    credentials: true,
    origin: configService.get<string>('frontend.nextApp'),
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(configService.get<number>('port') ?? 3000);
  logger.log(
    `api-gateway server is running on port ${configService.get<number>('port')}`,
  );
}
bootstrap().catch((error) => {
  logger.error('Failed to start application:', error);
  process.exit(1);
});
