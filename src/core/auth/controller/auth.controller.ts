import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from 'src/guard/local-auth.guard';
import { Request } from 'express';
import { AuthService } from '../service/auth.service';
import { PublicRoute } from 'src/decorator/public-route.decorator';
import { RefreshTokenRoute } from 'src/decorator/refresh-token-route.decorator';
import { LoginDto } from '../dto/auth.dto';
import { ApiTagsAndBearer } from 'src/decorator/api-tags-and-bearer.decorator';

@ApiTagsAndBearer('Authentication')
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @PublicRoute()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Body() body: LoginDto, @Req() req: Request) {
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
