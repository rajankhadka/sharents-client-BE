import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as util from 'util';
import * as amqplib from 'amqplib';
import {
  RABBITMQEXCHANGE,
  RABBITMQROUTE,
} from 'src/common/interface/rabbimq.interface';
import { DigitalSignatureService } from 'src/core/feature/digital-signature/digital-signature.service';

@Injectable()
export class RabbitmqService {
  private readonly rabbitmqConfig: Record<string, any>;
  constructor(
    private readonly configService: ConfigService,
    private readonly digitalSignatureService: DigitalSignatureService,
  ) {
    this.rabbitmqConfig =
      this.configService.get<Record<string, any>>('queue.rabbitmq');
  }

  private getRabbitMqURL() {
    return util.format(
      'amqp://%s:%s@%s:%d/%s',
      this.rabbitmqConfig.rabbitmqUser,
      this.rabbitmqConfig.rabbitmqPass,
      this.rabbitmqConfig.rabbitmqHost,
      this.rabbitmqConfig.rabbitmqPort,
      this.rabbitmqConfig.rabbitmqVhost,
    );
  }

  private async setup() {
    const connection = await amqplib.connect(this.getRabbitMqURL());
    const channel = await connection.createChannel();
    return { connection, channel };
  }

  public async publishMessage(
    exchange: RABBITMQEXCHANGE,
    routingKey: RABBITMQROUTE,
    msg: string,
  ) {
    const { channel, connection } = await this.setup();
    // const data = messageEncryption(msg);
    const message = await this.digitalSignatureService.digitalSignature(msg);
    await Promise.all([channel.publish(exchange, routingKey, message)]);
    await channel.close();
    await connection.close();
  }
}
