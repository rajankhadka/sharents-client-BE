import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ITokenPayload } from '../interface/auth.interface';
import { algorithm } from 'src/config/resource/constant.config';
import * as jwt from 'jsonwebtoken';
import { UserProfileService } from 'src/core/user-management/service/user-profile.service';

@Injectable()
export class AccessTokenStrategy {
  private accessTokenConfig: Record<string, string>;
  constructor(
    private readonly configService: ConfigService,
    private readonly userProfileService: UserProfileService,
  ) {
    this.accessTokenConfig = this.configService.get<Record<string, string>>(
      'client.token.accessToken',
    );
  }

  async validateToken(header: string) {
    const _headerSplit = header.split(' ');
    if (_headerSplit.length > 2) return null;
    if (_headerSplit[0].toLocaleLowerCase() !== 'bearer') return null;
    const token = _headerSplit[1];
    const payload = jwt.verify(token, this.accessTokenConfig.secretKey, {
      algorithms: [algorithm],
    });
    if (!payload['sub'] || !payload['identifier']) return null;
    const validatePayload = await this.userProfileService.validateAccessToken(
      payload['sub'].toString(),
      payload['identifier'].toString(),
      payload['identification'].toString(),
    );
    if (!validatePayload) return null;
    return validatePayload;
  }
}
