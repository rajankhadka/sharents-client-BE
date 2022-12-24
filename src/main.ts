import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  initializeTransactionalContext,
  patchTypeORMRepositoryWithBaseRepository,
} from 'typeorm-transactional-cls-hooked';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import configuration from './config/configutaion';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = new ConfigService(configuration());
  const config = configService.get<Record<string, any>>('http');

  initializeTransactionalContext(); // Initialize cls-hooked
  patchTypeORMRepositoryWithBaseRepository();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      disableErrorMessages: false,
    }),
  );
  await app.listen(config.port, () => {
    console.log(
      '===================================================================',
    );
    console.log(
      '============= Application running on %s:%d ===============',
      config.host,
      config.port,
    );
    console.log(
      '===================================================================',
    );
  });
}
bootstrap();
