/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Logger, Post, Req, Res, Session } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './core/auth/service/auth.service';
import { Request, Response } from 'express';
import { PublicRoute } from './decorator/public-route.decorator';
import { RunTimeException } from './exception/run-time.exception';
import { RabbitmqService } from './lib/rabbitmq.service';
import { RABBITMQROUTE } from './common/interface/rabbimq.interface';
import { ForgetPasswordDto } from './core/user-management/dto/user-profile.dto';
import { Session as Sess} from 'express-session';
import { addMinutes } from './utils/add-time.utils';
// import { DigitalSignatureService } from './core/feature/digital-signature/digital-signature.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    private readonly rabbitmq: RabbitmqService,
    // private readonly digitalSignature: DigitalSignatureService,
    private readonly logger: Logger,
  ) {}

  @PublicRoute()
  @Post()
  async getHello(@Session() session: Sess) {
    // await this.rabbitmq.publishMessage(
    //   'client-exchange',
    //   RABBITMQROUTE.MAILROUTE,
    //   JSON.stringify({route: 'mail-route', payload: "this is new mail"}),
    // );
    throw new RunTimeException('messahe');
    this.logger.log('message', AppController.name);
    return this.appService.getHello();
    // return { id: session['sessionId'], data: session['name'] };
  }

  @PublicRoute()
  @Get()
  async getHello1() {  
    return '';
    // return this.digitalSignature.digitalSignature(JSON.stringify({name: "rajan"}));
  }
}