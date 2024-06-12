import { INestApplication, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { sessionConfig } from './database/session';
import { SeederService } from './seeder/seeder.service';
import { LoggingInterceptor } from './common/interceptors/logger.interceptor';

export async function setNestApp(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // req시 DTO에 없는 속성 자동제거
      // forbidNonWhitelisted: true, // 허용하지 않은 속성을 제거하는 대신 예외를 throw
      // transform: true,
      // disableErrorMessages: true, // 유효성 검사에서 오류 반환시 오류 메시지를 없애줌
    }),
  );

  app.enableCors(); // cors 활성화

  // 모든 엔드포인트에 api 추가
  app.setGlobalPrefix('api');

  // 글로벌 Log 설정
  app.useGlobalInterceptors(new LoggingInterceptor());

  // 글로벌 예외 Log 설정
  app.useGlobalFilters(new HttpExceptionFilter());

  app.use(sessionConfig);

  // 테이블 초기 데이터 세팅
  const seederService = app.get(SeederService);
  await seederService.seed();
}
