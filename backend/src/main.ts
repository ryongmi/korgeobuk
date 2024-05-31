import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import sessionConfig from './util/session';
// import session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      disableErrorMessages: true, // 유효성 검사에서 오류 반환시 오류 메시지를 없애줌
    }),
  );
  app.use(sessionConfig);
  await app.listen(8000);
}
bootstrap();
