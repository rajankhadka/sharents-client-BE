import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtpRepository } from './otp.repository';
import { OtpService } from './otp.service';

@Module({
  imports: [TypeOrmModule.forFeature([OtpRepository])],
  controllers: [],
  providers: [OtpService],
  exports: [OtpService],
})
export class OTPModule {}
