import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  initializeTransactionalContext,
  patchTypeORMRepositoryWithBaseRepository,
} from 'typeorm-transactional-cls-hooked';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import configuration from './config/configutaion';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cors from 'cors';

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

  //maintain cors
  app.use(
    cors({
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
    }),
  );

  app.setGlobalPrefix('/v0/api');
  //swagger document
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Sharents')
    .setDescription("Let's share")
    .setVersion('0.1')
    .addTag('sharents')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/v0/docs', app, document);

  await app.listen(config.port, () => {
    console.log('Application running on %s:%d 🚀', config.host, config.port);
  });
}
bootstrap();
