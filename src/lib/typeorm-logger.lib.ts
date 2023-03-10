import { Injectable, Logger } from '@nestjs/common';
import { Logger as TypeormLogger, QueryRunner } from 'typeorm';

export class TypeOrmLogger implements TypeormLogger {
  private readonly logger = new Logger('SQL');
  log(
    level: 'log' | 'info' | 'warn',
    message: any,
    queryRunner?: QueryRunner,
  ): any {
    this.logger.log(message);
  }

  logMigration(message: string, queryRunner?: QueryRunner): any {
    this.logger.log(message);
  }

  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner): any {
    this.logger.log(query);
  }

  logQueryError(
    error: string,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner,
  ): any {
    this.logger.log(query);
  }

  logQuerySlow(
    time: number,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner,
  ): any {
    this.logger.log(query);
  }

  logSchemaBuild(message: string, queryRunner?: QueryRunner): any {
    this.logger.log(message);
  }
}
