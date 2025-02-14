import { INestApplication, ValidationPipe } from '@nestjs/common';
export function setup(app: INestApplication): INestApplication {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  return app;
}
