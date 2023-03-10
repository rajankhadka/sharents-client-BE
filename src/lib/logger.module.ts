import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { winstonLoggerUtils } from 'src/utils/logger';

@Module({
  imports: [WinstonModule.forRoot(winstonLoggerUtils)],
  exports: [WinstonModule],
})
export class CustomLoggerModule {}
