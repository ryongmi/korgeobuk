import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import sessionConfig from './util/session';
// import session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(sessionConfig);
  await app.listen(8000);
}
bootstrap();
