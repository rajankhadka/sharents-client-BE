import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './core/auth/service/auth.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getHello(@Req() req: Request): string {
    console.log(req?.user);
    return this.appService.getHello();
  }
}
