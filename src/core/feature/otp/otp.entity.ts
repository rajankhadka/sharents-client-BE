import { CommonEntity } from 'src/common/entity/common.entity';
import { UserProfileEntity } from 'src/core/user-management/entity/user-profile.entity';
import { Entity, ManyToOne, JoinColumn, Column } from 'typeorm';
import { EOTPTYPE } from './otp.dto';

@Entity({ name: 'sh_client_otp' })
export class OtpEntity extends CommonEntity {
  @Column({ type: 'varchar', nullable: false, length: 10 })
  otp: string;

  @Column({ type: 'enum', enum: EOTPTYPE, nullable: false })
  type: EOTPTYPE;

  @ManyToOne(() => UserProfileEntity)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserProfileEntity;

  @Column({ name: 'user_id', type: 'uuid', nullable: false })
  userId: string;

  @Column({
    name: 'expire_at',
    type: 'timestamp',
    nullable: false,
  })
  expireAt: Date;

  @Column({ name: 'is_verify', type: 'boolean', default: false })
  isVerify: boolean;
}
