import { INestApplication } from '@nestjs/common';

export function setup(app: INestApplication): INestApplication {
  app.useGlobalPipes();
  return app;
}
