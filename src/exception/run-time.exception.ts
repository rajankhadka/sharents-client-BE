import { HttpException, HttpStatus } from '@nestjs/common';
export class RunTimeException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
