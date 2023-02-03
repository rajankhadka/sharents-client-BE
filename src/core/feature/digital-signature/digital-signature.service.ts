import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DigitalSignatureService {
  constructor(private readonly configService: ConfigService) {}

  private async generateHashed(data: any) {}

  private async encrypteData(data: any){}

  private async generateDigitalSignature(data: any){}

  public async encryptDigitalSignature(data: any){}
}
