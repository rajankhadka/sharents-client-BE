import { CommonEntity } from 'src/common/entity/common.entity';
import { UserProfileEntity } from 'src/core/user-management/entity/user-profile.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'sh_client_session_storage' })
export class SessionStorageEntity extends CommonEntity {
  @Column({ name: 'session_id', type: 'varchar', length: 100, nullable: false })
  sessionId: string;

  @Column({ name: 'expire_at', type: 'timestamp', nullable: false })
  expireAt: Date;

  @ManyToOne(() => UserProfileEntity)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserProfileEntity;

  @Column({ name: 'user_id', type: 'uuid', nullable: false })
  userId: string;
}
