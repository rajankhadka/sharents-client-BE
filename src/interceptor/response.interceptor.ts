import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Response } from 'express';
import { Observable, map } from 'rxjs';
import { SuccessMessage } from 'src/common/message';
import * as utils from 'util';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const http = context.switchToHttp();
    const res = http.getResponse<Response>();
    const message = this.reflector.get<string>('message', context.getHandler());
    const source = this.reflector.get<string>('source', context.getHandler());
    const status = this.reflector.get<number>(
      'statusCode',
      context.getHandler(),
    );
    //prepared for message
    const responseMessage = SuccessMessage[source]?.length
      ? utils.format(SuccessMessage[source], message)
      : utils.format('%s successfully', message ?? '');
    const statusCode = status ?? HttpStatus.OK;
    return next.handle().pipe(
      map((data) => {
        res.json({
          message: responseMessage,
          success: true,
          data: data,
          statusCode,
          error: null,
        });
      }),
    );
  }
}
