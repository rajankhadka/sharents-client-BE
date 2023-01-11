import { EntityRepository } from 'typeorm';
import { UserProfileEntity } from '../entity/user-profile.entity';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { IAccessTokenData } from 'src/common/interface/token-data.interface';

@EntityRepository(UserProfileEntity)
export class UserProfileRepository extends BaseRepository<UserProfileEntity> {
  async getUserProfile(data: IAccessTokenData) {
    const fetchUserProfile = await this.query(
      `
        select
          profile.id as "profileId",
          profile.first_name as "firstName",
          profile.middle_name as "middleName",
          profile.last_name as "lastName",
          profile.user_name as "userName",
          profile.email,
          profile.phone_number as "phoneNumber",
          case
              when picture.file_name is not null
                then json_build_object(
                    'fileName', picture.file_name,
                    'filePath', concat(picture.file_path, '/', picture.file_name)
                )
              else '{}'
          end as "profilePicture"
        from sh_client_user_profile profile
        left join sh_client_user_profile_picture picture
        on profile.id = picture.user_profile_id and
            picture.user_profile_id = 'b64755f8-58d9-465f-bf41-3dc09ceb66f1' and
            profile.is_active is true and profile.is_deleted is not true and
            picture.is_active is true and profile.is_deleted is not true
        where profile.id = $1 and email = $2
      `,
      [data.id, data.email],
    );
    return fetchUserProfile.length ? fetchUserProfile[0] : null;
  }
}
