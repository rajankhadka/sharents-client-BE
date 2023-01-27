import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

import { OtpEntity } from './otp.entity';
@EntityRepository(OtpEntity)
export class OtpRepository extends BaseRepository<OtpEntity> {}
