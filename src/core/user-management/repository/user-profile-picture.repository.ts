import { EntityRepository } from 'typeorm';
import { UserProfilePictureEntity } from '../entity/user-profile-picture.entity';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

@EntityRepository(UserProfilePictureEntity)
export class UserProfilePictureRepository extends BaseRepository<UserProfilePictureEntity> {
  async fetchProfilePicture(userId: string) {
    const fetchData = await this.query(
      `
            select
                concat(file_path, '/',file_name) as "filePath",
                file_name as "fileName"
            from sh_client_user_profile_picture
            where user_profile_id = $1 and
                is_active is true and is_deleted is false
            limit 1;
        `,
      [userId],
    );
    return fetchData.length ? fetchData[0] : {};
  }
}
