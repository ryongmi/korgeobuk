import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AppConfigModule } from './config/app-config.module';
import { DatabaseModule } from './database/database.module';
import { SeederModule } from './seeder/seeder.module';

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    UserModule,
    SeederModule,
    // RouterModule.register([
    //   {
    //     path: 'api',
    //     module: UserModule,
    //   },
    // ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // 모든 컨트롤러에 들어오는 요청을 미들웨어에 통과시킴
  // 요청이 들어오면 해당 로직을 마치고, 마지막으로 로그 미들웨어를 실행함
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(LoggingMiddleware)
  //     .forRoutes({ path: '*', method: RequestMethod.ALL });
  // }
}
