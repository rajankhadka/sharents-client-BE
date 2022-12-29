import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { AccessTokenStrategy } from 'src/core/auth/strategy/access-token.strategy';
import { RefreshTokenStrategy } from 'src/core/auth/strategy/refresh-token.strategy';
import { IS_PUBLIC_ROUTE } from 'src/decorator/public-route.decorator';
import { IS_REFRESH_TOKEN_ROUTE } from 'src/decorator/refresh-token-route.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly accessTokenStrategy: AccessTokenStrategy,
    private readonly refreshTokenStrategy: RefreshTokenStrategy,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_ROUTE,
      [context.getHandler(), context.getClass()],
    );
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest<Request>();
    const header = request.headers.authorization;
    if (header?.length <= 0) return false;
    //check for refresh token route
    const isRefreshTokenRoute = this.reflector.getAllAndOverride<boolean>(
      IS_REFRESH_TOKEN_ROUTE,
      [context.getHandler(), context.getClass()],
    );
    if (isRefreshTokenRoute) {
      console.log('===================start===========');
      const payload = await this.refreshTokenValidate(header);
      if (!payload) return null;
      //set refresh token payload;
      request.user = payload;
      return true;
    }
    const payload = await this.accessTokenStrategy.validateToken(header);
    if (!payload) return false;
    //set access token payload;
    request.user = payload;
    return true;
  }

  async refreshTokenValidate(header: string) {
    return await this.refreshTokenStrategy.validateToken(header);
  }
}
