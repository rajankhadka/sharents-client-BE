import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './core/auth/service/auth.service';
import { Request } from 'express';
import { PublicRoute } from './decorator/public-route.decorator';
import { RunTimeException } from './exception/run-time.exception';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @PublicRoute()
  @Get()
  getHello(@Req() req: Request): string {
    // console.log(req?.user);
    throw new RunTimeException('this is custom message');
    return this.appService.getHello();
  }
}
