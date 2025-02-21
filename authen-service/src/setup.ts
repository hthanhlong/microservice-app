import {
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';

export function setup(app: INestApplication): INestApplication {
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  return app;
}
