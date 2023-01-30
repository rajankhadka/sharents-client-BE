/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Req, Session } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './core/auth/service/auth.service';
import { Request } from 'express';
import { PublicRoute } from './decorator/public-route.decorator';
import { RunTimeException } from './exception/run-time.exception';
import { RabbitmqService } from './lib/rabbitmq.service';
import { RABBITMQROUTE } from './common/interface/rabbimq.interface';
import { ForgetPasswordDto } from './core/user-management/dto/user-profile.dto';
import { Session as Sess} from 'express-session';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    private readonly rabbitmq: RabbitmqService,
  ) {}

  @PublicRoute()
  @Post()
  async getHello(@Session() session: Sess) {
    // await this.rabbitmq.publishMessage(
    //   'client-exchange',
    //   RABBITMQROUTE.MAILROUTE,
    //   Buffer.from(JSON.stringify({route: 'mail-route', payload: "this is new mail"})),
    // );
    // for(let i =0;i<1;i++){

    // }
    // console.log(req?.user);
    // throw new RunTimeException('this is custom message');
    return session.id;
  }

  @PublicRoute()
  @Get()
  async getHello1(@Session() session: Sess) {
    // await this.rabbitmq.publishMessage(
    //   'client-exchange',
    //   RABBITMQROUTE.MAILROUTE,
    //   Buffer.from(JSON.stringify({route: 'mail-route', payload: "this is new mail"})),
    // );
    // for(let i =0;i<1;i++){

    // }
    // console.log(req?.user);
    // throw new RunTimeException('this is custom message');

    return session.id;
  }
}
