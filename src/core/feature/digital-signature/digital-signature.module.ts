import { Module } from '@nestjs/common';
import { DigitalSignatureService } from './digital-signature.service';

@Module({
  imports: [],
  providers: [DigitalSignatureService],
  exports: [],
})
export class DigitalSignatureModule {}
