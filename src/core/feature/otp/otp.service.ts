import { Injectable } from '@nestjs/common';
import { OtpRepository } from './otp.repository';
import { EOTPTYPE } from './otp.dto';

@Injectable()
export class OtpService {
  constructor(private readonly otpRepository: OtpRepository) {}

  async generateOtp(userId: string, type: EOTPTYPE, length: number = 6){
    //random function to determine length of digit, small, capital
    
  }
}
