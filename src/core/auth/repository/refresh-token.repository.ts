import { EntityRepository } from 'typeorm';
import { RefreshTokenEntity } from '../entity/refresh-token.entity';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

@EntityRepository(RefreshTokenEntity)
export class RefreshTokenRepository extends BaseRepository<RefreshTokenEntity> {}
