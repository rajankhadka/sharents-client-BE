import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { AccessTokenStrategy } from 'src/core/auth/strategy/access-token.strategy';
import { RefreshTokenStrategy } from 'src/core/auth/strategy/refresh-token.strategy';
import { IS_PUBLIC_ROUTE } from 'src/decorator/public-route.decorator';
import { IS_REFRESH_TOKEN_ROUTE } from 'src/decorator/refresh-token-route.decorator';
import { RequestCannotPerform } from 'src/exception/request-cannot-perform.exception';

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
    if (!header?.length) throw new UnauthorizedException();
    //check for refresh token route
    const isRefreshTokenRoute = this.reflector.getAllAndOverride<boolean>(
      IS_REFRESH_TOKEN_ROUTE,
      [context.getHandler(), context.getClass()],
    );
    if (isRefreshTokenRoute) {
      console.log('===================start===========');
      const payload = await this.refreshTokenValidate(header);
      if (!payload) throw new RequestCannotPerform('request cannot be perform');
      //set refresh token payload;
      request.user = payload;
      return true;
    }
    const payload = await this.accessTokenStrategy.validateToken(header);
    if (!payload) throw new UnauthorizedException();
    //set access token payload;
    request.user = payload;
    return true;
  }

  async refreshTokenValidate(header: string) {
    return await this.refreshTokenStrategy.validateToken(header);
  }
}
