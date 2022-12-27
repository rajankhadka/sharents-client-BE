import { Injectable } from '@nestjs/common';
import { UserProfileService } from 'src/core/user-management/service/user-profile.service';
import { LoginDto } from '../dto/auth.dto';
import { IAuthUser, ITokenPayload } from '../interface/auth.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userProfileService: UserProfileService,
    private readonly jwtService: JwtService,
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
    return { accessToken: this.jwtService.sign(payload) };
  }
}
