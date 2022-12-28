import { Injectable } from '@nestjs/common';
import { UserProfileService } from 'src/core/user-management/service/user-profile.service';
import { LoginDto } from '../dto/auth.dto';
import { IAuthUser, ITokenPayload } from '../interface/auth.interface';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { algorithm } from '../../../config/resource/constant.config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userProfileService: UserProfileService,
    private readonly configService: ConfigService,
  ) {}

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

    //to be continue
    return {
      accessToken: await this.accessTokenSign(payload),
      refreshToken: await this.refreshTokenSign(payload),
    };
  }

  async accessTokenSign(payload: ITokenPayload) {
    const accessTokenConfig = this.configService.get<Record<string, string>>(
      'client.token.accessToken',
    );
    return jwt.sign(payload, accessTokenConfig.secretKey, {
      algorithm,
      expiresIn: accessTokenConfig.expireTime,
    });
  }

  async refreshTokenSign(payload: ITokenPayload) {
    const refreshTokenConfig = this.configService.get<Record<string, string>>(
      'client.token.refreshToken',
    );
    return jwt.sign(payload, refreshTokenConfig.secretKey, {
      algorithm,
      expiresIn: refreshTokenConfig.expireTime,
    });
  }
}
