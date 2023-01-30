import { Injectable } from '@nestjs/common';
import { ClientPasswordRepository } from './client-password.repository';
import { EPASSWORDREMARK } from './client-password.dto';
import { RunTimeException } from 'src/exception/run-time.exception';

@Injectable()
export class ClientPasswordService {
  constructor(
    private readonly clientPasswordRepository: ClientPasswordRepository,
  ) {}
  /**
   * check recently changed password i.e. only 3 old password is checked with respect to new password
   */
  private async checkRecentlyChangedPassword(password: string, userId: string) {
    return await this.clientPasswordRepository.checkRecentlyChangedPassword(
      password,
      userId,
    );
  }

  async validatePassword(
    password: string,
    userId: string,
    remark: EPASSWORDREMARK,
  ) {
    const fetchPasswordStatus = await this.checkRecentlyChangedPassword(
      password,
      userId,
    );
    if (!fetchPasswordStatus)
      throw new RunTimeException(
        'you have already used this password, please try with new password',
      );
    await this.clientPasswordRepository.save({ password, userId, remark });
  }
}
