import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from 'src/guard/local-auth.guard';
import { Request } from 'express';
import { AuthService } from '../service/auth.service';
import { PublicRoute } from 'src/decorator/public-route.decorator';
import { RefreshTokenRoute } from 'src/decorator/refresh-token-route.decorator';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @PublicRoute()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req: Request) {
    return this.authService.login({
      identifier: req.user['email'],
      id: req.user['id'],
    });
  }

  @RefreshTokenRoute()
  @Get('/new-token-pair')
  async generateNewTokenPair(@Req() req: Request) {
    return await this.authService.generateNewTokenPair({
      id: req.user['id'].toString(),
    });
  }
}
