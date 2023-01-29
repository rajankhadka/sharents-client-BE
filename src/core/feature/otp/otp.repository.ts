import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { EOTPTYPE } from './otp.dto';

import { OtpEntity } from './otp.entity';
@EntityRepository(OtpEntity)
export class OtpRepository extends BaseRepository<OtpEntity> {
  async verifyOtp(
    identifier: string,
    type: EOTPTYPE,
    otp: string,
    currentDate: Date,
  ) {
    const fetchData = await this.query(
      `
            select otp.id as otpId 
            from sh_client_otp otp
            inner join sh_client_user_profile user_profile
                on otp.user_id = user_profile.id and
                (user_profile.email = $1 or user_profile.phone_number = $1 or user_profile.user_name = $1) and
                user_profile.is_active is true and user_profile.is_deleted is false
            where otp.otp = $3 and otp.type = $2 and
                otp.created_at::timestamp <= $4::timestamp and otp.expire_at::timestamp >= $4::timestamp and
                otp.is_active is true and otp.is_deleted is false;
        `,
      [identifier, type, otp, currentDate],
    );
    return fetchData.length ? fetchData[0] : null;
  }
}
