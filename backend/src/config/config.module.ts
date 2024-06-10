import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { default as defaultConfig } from './default';
import { databaseConfig } from './database';
import { naverConfig } from './naver';
import { googleConfig } from './google';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: [`.env.${process.env.NODE_ENV}.local`],
      load: [defaultConfig, databaseConfig, googleConfig, naverConfig],
    }),
  ],
})
export class CustomConfigModule {}
