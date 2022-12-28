import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LoginDto } from '../dto/auth.dto';
import { LocalAuthGuard } from 'src/guard/local-auth.guard';
import { Request as ERequest } from 'express';
import { AuthService } from '../service/auth.service';
import { PublicRoute } from 'src/decorator/public-route.decorator';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @PublicRoute()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req: ERequest) {
    return this.authService.login({
      identifier: req.user['userName'],
      id: req.user['id'],
    });
  }
}
