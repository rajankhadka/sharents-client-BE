import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshTokenRepository } from './repository/refresh-token.repository';
import { AuthService } from './service/auth.service';
import { UserManagementModule } from '../user-management/user-management.module';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtModule as AccessJwtModule } from '@nestjs/jwt';
import { JwtModule as RefreshJwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigurationModule } from 'src/config/configuration.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([RefreshTokenRepository]),
    UserManagementModule,
    PassportModule,
    AccessJwtModule.registerAsync({
      imports: [ConfigurationModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const accessTokenConfig = configService.get<Record<string, string>>(
          'client.token.accessToken',
        );
        return {
          secret: accessTokenConfig.secretKey,
          signOptions: { expiresIn: accessTokenConfig.expireTime },
        };
      },
    }),
    RefreshJwtModule.registerAsync({
      imports: [ConfigurationModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const accessTokenConfig = configService.get<Record<string, string>>(
          'client.token.refreshToken',
        );
        return {
          secret: accessTokenConfig.secretKey,
          signOptions: { expiresIn: accessTokenConfig.expireTime },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
  exports: [],
})
export class AuthModule {}
