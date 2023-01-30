import { Body, Controller, HttpStatus, Post, Req } from '@nestjs/common';
import { ApiTagsAndBearer } from 'src/decorator/api-tags-and-bearer.decorator';
import { PublicRoute } from 'src/decorator/public-route.decorator';
import { ResponseMessage } from 'src/decorator/response.decorator';
import { InternalVerifyOtpDTO, VerifyOtpDTO } from './otp.dto';
import { OtpService } from './otp.service';
import { Request } from 'express';

@ApiTagsAndBearer('OTP')
@Controller('/otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @ResponseMessage('otp', 'otp', HttpStatus.OK)
  @PublicRoute()
  @Post('/verify')
  verifyOtp(@Body() body: VerifyOtpDTO) {
    return this.otpService.verifyOtp(body.identifier, body.type, body.otp);
  }

  @ResponseMessage('otp', 'otp', HttpStatus.OK)
  @Post('/internal-verify')
  internalVerifyOtp(@Body() body: InternalVerifyOtpDTO, @Req() req: Request) {
    return this.otpService.verifyOtp(req.user['email'], body.type, body.otp);
  }
}
