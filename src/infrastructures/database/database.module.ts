import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { getTypeOrmConfig } from './typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      cache: false,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: getTypeOrmConfig,
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
