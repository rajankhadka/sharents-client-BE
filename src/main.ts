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
import * as session from 'express-session';
import { WinstonModule } from 'nest-winston';
import { winstonLoggerUtils } from './utils/logger';
import * as winston from 'winston';

async function bootstrap() {
  const logger = winston.createLogger(winstonLoggerUtils);
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(logger),
  });
  const configService = new ConfigService(configuration());
  const config = configService.get<Record<string, any>>('http');
  const sessionConfig =
    configService.get<Record<string, any>>('client.session');

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

  //session initalized
  app.use(
    session({
      secret: sessionConfig.secret,
      saveUninitialized: false,
      resave: false,
      cookie: { httpOnly: true, secure: false },
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
    logger.info(`Application running on ${config.host}:${config.port} 🚀`);
  });
}
bootstrap();
