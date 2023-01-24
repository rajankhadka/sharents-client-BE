/* eslint-disable prettier/prettier */
import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './core/auth/service/auth.service';
import { Request } from 'express';
import { PublicRoute } from './decorator/public-route.decorator';
import { RunTimeException } from './exception/run-time.exception';
import { RabbitmqService } from './lib/rabbitmq.service';
import { RABBITMQROUTE } from './common/interface/rabbimq.interface';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    private readonly rabbitmq: RabbitmqService,
    ) {}

  @PublicRoute()
  @Get()
  async getHello(@Req() req: Request) {
    
    await this.rabbitmq.publishMessage(
      'client-exchange',
      RABBITMQROUTE.MAILROUTE,
      Buffer.from(JSON.stringify({route: 'mail-route', payload: "this is new mail"})),
    );
    // for(let i =0;i<1;i++){
      
    // }
    // console.log(req?.user);
    // throw new RunTimeException('this is custom message');
    return this.appService.getHello();
  }
}
