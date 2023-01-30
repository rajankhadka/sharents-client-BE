import { Injectable } from '@nestjs/common';
import { OtpRepository } from './otp.repository';
import { EOTPTYPE } from './otp.dto';
import { addMinutes } from 'src/utils/add-time.utils';
import { RunTimeException } from 'src/exception/run-time.exception';
import { Transactional } from 'typeorm-transactional-cls-hooked';

@Injectable()
export class OtpService {
  constructor(private readonly otpRepository: OtpRepository) {}

  private generateOtp(length = 6) {
    let _length = length;
    const min = 0;
    const max = 2;
    const arr = ['digit', 'small', 'capital'];
    const randomPick = [];
    let i = 0;
    let rand = null;
    const eachOtpLength = [];

    /**
     * get random position of digit, small, and capital letter
     * with respect of there length
     */
    while (i < 3) {
      const _rand = Math.floor(Math.random() * (max - min + 1)) + min;
      const pick = arr[_rand];
      if (rand !== _rand && !randomPick.find((item) => pick === item)) {
        rand = _rand;
        if (i === 2) {
          eachOtpLength.push(_length);
        } else {
          const otpEachLength = Math.ceil(_length / 2);
          _length = _length - otpEachLength;
          eachOtpLength.push(otpEachLength);
        }
        randomPick.push(pick);
        arr.slice();
        i++;
      }
    }

    /**
     * generate the new otp with respective to their defined length
     */
    let otp = '';
    for (let i = 0; i < 3; i++) {
      const letter = randomPick[i];
      const letterLength = eachOtpLength[i];
      let min: number, max: number;
      for (let j = 0; j <= letterLength - 1; j++) {
        if (letter === 'digit') {
          min = 48;
          max = 57;
          const ascii = Math.floor(Math.random() * (max - min + 1)) + min;
          otp += String.fromCharCode(ascii);
        } else if (letter === 'small') {
          min = 97;
          max = 122;
          const ascii = Math.floor(Math.random() * (max - min + 1)) + min;
          otp += String.fromCharCode(ascii);
        } else {
          min = 65;
          max = 90;
          const ascii = Math.floor(Math.random() * (max - min + 1)) + min;
          otp += String.fromCharCode(ascii);
        }
      }
    }

    /**
     * random shuffle of their string
     */
    return otp
      .split('')
      .sort(() => 0.5 - Math.random())
      .join('');
  }

  async newOtpGeneration(userId: string, type: EOTPTYPE) {
    const otpLength = 6;
    const newOtp = this.generateOtp(otpLength);
    const createdAt = new Date();
    const expireAt = addMinutes(new Date(createdAt), 5);
    await this.otpRepository.save({
      otp: newOtp,
      userId: userId,
      type: type,
      createdAt,
      expireAt,
    });
    return { otp: newOtp, createdAt, expireAt, length: otpLength };
  }

  @Transactional()
  async verifyOtp(identifier: string, type: EOTPTYPE, otp: string) {
    const fetchOtp = await this.otpRepository.verifyOtp(
      identifier,
      type,
      otp,
      new Date(),
    );
    if (!fetchOtp) throw new RunTimeException('otp mismatch');
    await this.otpRepository.update(
      { id: fetchOtp.otpId },
      { isActive: false, isDeleted: false, isVerify: true },
    );
    return { otpMatch: true };
  }

  async getVerifiedOtp(userId: string, type: EOTPTYPE) {
    const fetchVerifiedOtp = await this.otpRepository.getVerifiedOtp(
      userId,
      type,
    );
    if (!fetchVerifiedOtp)
      throw new RunTimeException(
        'otp verification failed, use latest otp that has been sent!',
      );
    return fetchVerifiedOtp;
  }

  /**
   * changed otp status to deleted as true because its already used
   */
  async deleteOtp(otpId: string) {
    await this.otpRepository.update(
      { id: otpId },
      { isActive: false, isDeleted: true },
    );
    return {};
  }
}
