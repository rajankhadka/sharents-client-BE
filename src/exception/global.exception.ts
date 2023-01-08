import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { TokenExpiredError } from 'jsonwebtoken';
import { RunTimeException } from './run-time.exception';
import { ErrorMessage } from 'src/common/message';
import {
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';

interface IErrorResponse {
  data: null;
  success: boolean;
  statusCode: number;
  message: string;
  error: string;
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapter: HttpAdapterHost) {}
  catch(exception: any, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapter;
    const ctx = host.switchToHttp();

    const responseBody = {
      data: null,
      success: false,
    } as IErrorResponse;
    //get error status code
    responseBody['statusCode'] =
      exception?.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;
    //check for Exception class

    if (exception instanceof TokenExpiredError) {
      responseBody['message'] = ErrorMessage[exception.name];
      responseBody['error'] = exception.name;
    } else if (exception instanceof UnauthorizedException) {
      responseBody['message'] = ErrorMessage[exception.name];
      responseBody['error'] = exception.name;
    } else if (exception instanceof NotFoundException) {
      responseBody['message'] = ErrorMessage[exception.name];
      responseBody['error'] = exception.name;
    } else if (exception instanceof RunTimeException) {
      responseBody['message'] = exception.getResponse().toString();
      responseBody['error'] = exception.name;
    } else {
      responseBody['message'] = 'Internal server error';
      responseBody['error'] = 'InternalServerError';
    }

    httpAdapter.reply(
      ctx.getResponse(),
      responseBody,
      responseBody['statusCode'],
    );
  }
}
