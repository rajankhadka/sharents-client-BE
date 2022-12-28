import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { AccessTokenStrategy } from 'src/core/auth/strategy/access-token.strategy';
import { IS_PUBLIC_ROUTE } from 'src/decorator/public-route.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly accessTokenStrategy: AccessTokenStrategy,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_ROUTE,
      [context.getHandler(), context.getClass()],
    );
    if (isPublic) return true;
    const request = context.switchToHttp().getRequest<Request>();
    const payload = await this.accessTokenStrategy.validateToken(
      request.headers.authorization,
    );
    if (!payload) return false;
    request.user = payload;
    return true;
  }
}
