import { Body, Controller, Post } from '@nestjs/common';

@Controller('/auth')
export class AuthController {
  @Post('/login')
  async login(@Body() body: any) {}
}
