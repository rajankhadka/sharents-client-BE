import { EntityRepository } from 'typeorm';
import { UserProfileEntity } from '../entity/user-profile.entity';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { ITokenPayload } from 'src/core/auth/interface/auth.interface';
import { IAccessTokenData } from 'src/common/interface/token-data.interface';

@EntityRepository(UserProfileEntity)
export class UserProfileRepository extends BaseRepository<UserProfileEntity> {
  async getUserProfile(data: IAccessTokenData) {
    const fetchUserProfile = await this.query(
      `
        select
            id,
            first_name as "firstName",
            middle_name as "middleName",
            last_name as "lastName",
            user_name as "userName",
            email,
            phone_number as "phoneNumber"
        from sh_client_user_profile profile
        where profile.id = $1 and
            profile.is_active is true and
            profile.is_deleted is false and
            (profile.email = $2);
            `,
      [data.id, data.email],
    );
    return fetchUserProfile.length ? fetchUserProfile[0] : {};
  }
}
