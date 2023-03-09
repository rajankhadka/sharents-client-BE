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

  async validateUserCredentials(identifier: string) {
    const fetchData = await this.query(
      `
        select email, id, password, is_active as "isActive"
        from sh_client_user_profile
        where (user_name =  $1 or email = $1 or phone_number = $1) 
          and is_deleted is false
        limit 1;
      `,
      [identifier.toLowerCase()],
    );
    return fetchData.length ? fetchData[0] : null;
  }

  async getUserIdByEmailOrUsernameOrPhone(identifier: string) {
    const fetchData = await this.query(
      `
        select id, user_name as "userName", email 
        from sh_client_user_profile
        where user_name = $1 or 
              email = $1 or 
              phone_number = $1 and
              (is_active is true and is_deleted is false)
        limit 1;
      `,
      [identifier],
    );
    return fetchData.length ? fetchData[0] : null;
  }

  async validateAccessToken(id: string, email: string, identification: string) {
    const fetchUser = await this.query(
      `
        select profile.email as "email", profile.id as "id"
        from sh_client_refresh_token token
        inner join sh_client_user_profile profile
            on token.user_id = profile.id
        where identification = $3 and
              profile.id = $1 and profile.email = $2 and profile.is_deleted is false and profile.is_active is true and
              token.is_active is true and token.is_deleted is false;
      `,
      [id, email, identification],
    );
    return fetchUser.length ? fetchUser[0] : null;
  }

  async deleteIdentificationAfterPasswordChanged(id: string, email: string) {
    await this.query(
      `
        delete from sh_client_refresh_token token
        where user_id = (
            select id
            from sh_client_user_profile profile
            where email = $2 and id = $1 and
                  profile.is_active is true and profile.is_deleted is false
            limit 1
        );
      `,
      [id, email],
    );
    return true;
  }

  async deleteIdentificationAfterPasswordReset(identifier: string) {
    await this.query(
      `
        delete from sh_client_refresh_token token
        where user_id = (
          select id
          from sh_client_user_profile profile
          where (profile.email = $1 or profile.phone_number = $1 or profile.user_name = $1 )and
                profile.is_active is true and profile.is_deleted is false
          limit 1
        );
      `,
      [identifier],
    );
    return true;
  }

  async fetchEmailAndUserNameUsingIdentifier(identifier: string) {
    const resData = await this.query(
      `
        select email
        from sh_client_user_profile
        where user_name = $1 or phone_number = $1 or email = $1
      `,
      [identifier],
    );
    return resData.length ? resData[0] : null;
  }
}
