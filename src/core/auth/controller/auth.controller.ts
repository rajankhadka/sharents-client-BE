import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from 'src/guard/local-auth.guard';
import { Request } from 'express';
import { AuthService } from '../service/auth.service';
import { PublicRoute } from 'src/decorator/public-route.decorator';
import { RefreshTokenRoute } from 'src/decorator/refresh-token-route.decorator';
import { LoginDto } from '../dto/auth.dto';
import { ApiTagsAndBearer } from 'src/decorator/api-tags-and-bearer.decorator';
import { ResponseMessage } from 'src/decorator/response.decorator';

@ApiTagsAndBearer('Authentication')
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ResponseMessage('user authenticated', 'login', HttpStatus.ACCEPTED)
  @PublicRoute()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Body() body: LoginDto, @Req() req: Request) {
    return this.authService.login({
      identifier: req.user['email'],
      id: req.user['id'],
    });
  }

  @ResponseMessage('new autheticated token', 'newToken', HttpStatus.OK)
  @RefreshTokenRoute()
  @Get('/new-token-pair')
  async generateNewTokenPair(@Req() req: Request) {
    return this.authService.generateNewTokenPair({
      id: req.user['id'].toString(),
      identification: req.user['identification'].toString(),
    });
  }
}
