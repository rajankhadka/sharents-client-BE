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
import { RefreshTokenRepository } from '../repository/refresh-token.repository';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { randomBytes } from 'crypto';
@Injectable()
export class AuthService {
  private accessTokenConfig: Record<string, string>;
  private refreshTokenConfig: Record<string, string>;
  constructor(
    private readonly userProfileService: UserProfileService,
    private readonly configService: ConfigService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
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
    const identification = randomBytes(32).toString('hex');
    const payload: ITokenPayload = {
      identifier: user.identifier,
      sub: user.id,
      identification,
    };
    //generate new identification token
    return {
      accessToken: await this.accessTokenSign(payload),
      refreshToken: await this.refreshTokenSign({
        sub: user.id,
        identification,
      }),
    };
  }

  async accessTokenSign(payload: ITokenPayload) {
    return jwt.sign(payload, this.accessTokenConfig.secretKey, {
      algorithm,
      expiresIn: this.accessTokenConfig.expireTime,
    });
  }

  async refreshTokenSign(payload: IRefreshTokenPayload) {
    const refreshToken = jwt.sign(payload, this.refreshTokenConfig.secretKey, {
      algorithm,
      expiresIn: this.refreshTokenConfig.expireTime,
    });
    await this.refreshTokenRepository.save({
      userId: payload.sub,
      refreshToken: refreshToken,
      identification: payload.identification,
    });
    return refreshToken;
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

  @Transactional()
  async validateRefreshToken(
    userId: string,
    token: string,
    identification: string,
  ) {
    const foundToken = await this.refreshTokenRepository.findOne({
      where: {
        refreshToken: token,
        userId: userId,
        isActive: true,
        isDeleted: false,
        identification,
      },
      select: ['userId', 'identification'],
    });
    await this.refreshTokenRepository.delete({
      userId,
      isActive: true,
      identification,
    });
    if (!foundToken) return null;
    return { id: foundToken.userId, identification };
  }

  @Transactional()
  async generateNewTokenPair(data: any) {
    const activeUser = await this.userProfileService.getUserProfileById(
      data.id,
    );
    if (!activeUser) return null;
    const refreshToken = await this.refreshTokenSign({
      sub: activeUser.id,
      identification: data.identification,
    });
    const accessToken = await this.accessTokenSign({
      identifier: activeUser.email,
      sub: activeUser.id,
      identification: data.identification,
    });
    console.log('==============end============');
    return {
      accessToken,
      refreshToken,
    };
  }
}
