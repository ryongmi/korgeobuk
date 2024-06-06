import { INestApplication, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';
import { sessionConfig } from './database/session';
import { SeederService } from './seeder/seeder.service';

export async function setNestApp(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      // disableErrorMessages: true, // 유효성 검사에서 오류 반환시 오류 메시지를 없애줌
    }),
  );

  // Error Log 전역 설정
  // app.useGlobalInterceptors(new ErrorLoggingInterceptor());
  // app.useGlobalMiddleware(LoggingMiddleware);

  // 모든 엔드포인트에 api 추가
  app.setGlobalPrefix('api');

  // 글로벌 예외 필터를 설정합니다.
  app.useGlobalFilters(new HttpExceptionFilter());

  app.use(sessionConfig);

  // 테이블 초기 데이터 세팅
  const seederService = app.get(SeederService);
  await seederService.seed();
}
