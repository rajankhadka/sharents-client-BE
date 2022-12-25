import { EntityRepository } from 'typeorm';
import { UserProfileEntity } from '../entity/user-profile.entity';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

@EntityRepository(UserProfileEntity)
export class UserProfileRepository extends BaseRepository<UserProfileEntity> {}
