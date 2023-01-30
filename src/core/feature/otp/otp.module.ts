import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtpRepository } from './otp.repository';
import { OtpService } from './otp.service';
import { OtpController } from './otp.controller';

@Module({
  imports: [TypeOrmModule.forFeature([OtpRepository])],
  controllers: [OtpController],
  providers: [OtpService],
  exports: [OtpService],
})
export class OTPModule {}
