import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { default as defaultConfig } from './default';
import { default as databaseConfig } from './database';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [defaultConfig, databaseConfig],
      envFilePath: [`.env.${process.env.NODE_ENV}.local`],
    }),
  ],
})
export class CustomConfigModule {}
