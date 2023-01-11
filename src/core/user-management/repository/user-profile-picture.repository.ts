import { EntityRepository } from 'typeorm';
import { UserProfilePictureEntity } from '../entity/user-profile-picture.entity';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

@EntityRepository(UserProfilePictureEntity)
export class UserProfilePictureRepository extends BaseRepository<UserProfilePictureEntity> {}
