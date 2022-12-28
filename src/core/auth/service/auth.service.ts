import { Injectable } from '@nestjs/common';
import { UserProfileService } from 'src/core/user-management/service/user-profile.service';
import { LoginDto } from '../dto/auth.dto';
import {
  IAuthUser,
  IRefreshTokenPayload,
  ITokenPayload,
} from '../interface/auth.interface';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { algorithm } from '../../../config/resource/constant.config';

@Injectable()
export class AuthService {
  private accessTokenConfig: Record<string, string>;
  private refreshTokenConfig: Record<string, string>;
  constructor(
    private readonly userProfileService: UserProfileService,
    private readonly configService: ConfigService,
  ) {
    this.accessTokenConfig = this.configService.get<Record<string, string>>(
      'client.token.accessToken',
    );

    this.refreshTokenConfig = this.configService.get<Record<string, string>>(
      'client.token.refreshToken',
    );
  }

  async validateClient(data: LoginDto) {
    return this.userProfileService.validateClient(
      data.identifier,
      data.password,
    );
  }

  async login(user: IAuthUser) {
    const payload: ITokenPayload = {
      identifier: user.identifier,
      sub: user.id,
    };

    return {
      accessToken: await this.accessTokenSign(payload),
      refreshToken: await this.refreshTokenSign({ sub: user.id }),
    };
  }

  async accessTokenSign(payload: ITokenPayload) {
    return jwt.sign(payload, this.accessTokenConfig.secretKey, {
      algorithm,
      expiresIn: this.accessTokenConfig.expireTime,
    });
  }

  async refreshTokenSign(payload: IRefreshTokenPayload) {
    return jwt.sign(payload, this.refreshTokenConfig.secretKey, {
      algorithm,
      expiresIn: this.refreshTokenConfig.expireTime,
    });
  }

  accessTokenVerify(token: string) {
    return jwt.verify(token, this.accessTokenConfig.secretKey, {
      algorithms: [algorithm],
    });
  }

  refreshTokenVerify(token: string) {
    return jwt.verify(token, this.refreshTokenConfig.secretKey, {
      algorithms: [algorithm],
    });
  }
}
