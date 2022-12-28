import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshTokenRepository } from './repository/refresh-token.repository';
import { AuthService } from './service/auth.service';
import { UserManagementModule } from '../user-management/user-management.module';
import { LocalStrategy } from './strategy/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { AccessTokenStrategy } from './strategy/access-token.strategy';
@Module({
  imports: [
    TypeOrmModule.forFeature([RefreshTokenRepository]),
    UserManagementModule,
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, AccessTokenStrategy],
  exports: [AuthService, AccessTokenStrategy],
})
export class AuthModule {}
