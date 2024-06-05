import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import sessionConfig from './util/session';
import { LoggingMiddleware } from './common/middleware/logger.middleware';
import { ErrorLoggingInterceptor } from './common/interceptors/error-log.interceptor';
// import session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    // , {logger: ['log', 'error', 'warn', 'debug'],}
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      // disableErrorMessages: true, // 유효성 검사에서 오류 반환시 오류 메시지를 없애줌
    }),
  );

  // 모든 엔드포인트에 api 추가
  app.setGlobalPrefix('api');

  // Error Log 전역 설정
  app.useGlobalInterceptors(new ErrorLoggingInterceptor());
  // app.use(new LoggingMiddleware().use);
  // app.useGlobalMiddleware(LoggingMiddleware);
  app.use(sessionConfig);

  await app.listen(8000);
}
bootstrap();
