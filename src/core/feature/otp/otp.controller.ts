import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiTagsAndBearer } from 'src/decorator/api-tags-and-bearer.decorator';
import { PublicRoute } from 'src/decorator/public-route.decorator';
import { ResponseMessage } from 'src/decorator/response.decorator';
import { VerifyOtp } from './otp.dto';
import { OtpService } from './otp.service';

@ApiTagsAndBearer('OTP')
@Controller('/otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @ResponseMessage('otp', 'otp', HttpStatus.OK)
  @PublicRoute()
  @Post('/verify')
  verifyOtp(@Body() body: VerifyOtp) {
    return this.otpService.verifyOtp(body.identifier, body.type, body.otp);
  }
}
