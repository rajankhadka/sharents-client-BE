import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigurationModule } from './config/configuration.module';
import { DatabaseModule } from './lib/database.module';
import { importAllFilesFromFolder } from './utils/read-all-module.utils';
import { ISearchParams } from './common/interface/search-param.interface';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guard/auth.guard';

@Module({
  imports: [
    ConfigurationModule,
    DatabaseModule,
    ...importAllFilesFromFolder(ISearchParams.MODULE),
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: AuthGuard }],
})
export class AppModule {}
