import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { algorithm } from 'src/config/resource/constant.config';
import * as jwt from 'jsonwebtoken';
import { AuthService } from '../service/auth.service';
import { RequestCannotPerform } from 'src/exception/request-cannot-perform.exception';
@Injectable()
export class RefreshTokenStrategy {
  private readonly refreshTokenConfig: Record<string, string>;
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    this.refreshTokenConfig = this.configService.get<Record<string, string>>(
      'client.token.refreshToken',
    );
  }

  async validateToken(header: string) {
    const _headerSplit = header.split(' ');
    if (_headerSplit.length > 2) throw new UnauthorizedException();
    if (_headerSplit[0].toLocaleLowerCase() !== 'bearer')
      throw new UnauthorizedException();
    const token = _headerSplit[1];
    const payload = jwt.verify(token, this.refreshTokenConfig.secretKey, {
      algorithms: [algorithm],
    });
    if (!payload['sub']) throw new UnauthorizedException();
    const validatePayload = await this.authService.validateRefreshToken(
      payload['sub'].toString(),
      token,
      payload['identification'].toString(),
    );
    if (!validatePayload)
      throw new RequestCannotPerform('cannot perform request, sorry!!!');
    return validatePayload;
  }
}
