import { HttpException, HttpStatus } from '@nestjs/common';
export class RequestCannotPerform extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.NOT_ACCEPTABLE);
  }
}
