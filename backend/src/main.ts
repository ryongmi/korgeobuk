import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setNestApp } from './setNestApp';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 글로벌 설정
  setNestApp(app);

  // const configService = app.get(ConfigService);
  // const port = configService.get('port') || 8000;

  await app.listen(8000);
}
bootstrap();
