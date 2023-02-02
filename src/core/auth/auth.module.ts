import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshTokenRepository } from './repository/refresh-token.repository';
import { AuthService } from './service/auth.service';
import { UserManagementModule } from '../user-management/user-management.module';
import { LocalStrategy } from './strategy/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { AccessTokenStrategy } from './strategy/access-token.strategy';
import { RefreshTokenStrategy } from './strategy/refresh-token.strategy';
import { SessionStorageService } from './service/session-storage.service';
import { SessionStorageRepository } from './repository/session-storage.repository';
@Module({
  imports: [
    TypeOrmModule.forFeature([RefreshTokenRepository]),
    UserManagementModule,
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
  exports: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
})
export class AuthModule {}
