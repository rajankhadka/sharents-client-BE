import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './configutaion';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      cache: true,
    }),
  ],
})
export class ConfigurationModule {}
