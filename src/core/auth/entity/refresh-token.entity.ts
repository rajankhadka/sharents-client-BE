import { CommonEntity } from 'src/common/entity/common.entity';
import { UserProfileEntity } from 'src/core/user-management/entity/user-profile.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'sh_client_refresh_token' })
export class RefreshTokenEntity extends CommonEntity {
  @Column({ name: 'refresh_token', type: 'varchar', nullable: false })
  refreshToken: string;

  @Column({
    name: 'identification',
    type: 'varchar',
    length: 70,
    nullable: false,
  })
  identification: string;

  @ManyToOne(() => UserProfileEntity)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserProfileEntity;

  @Column({ name: 'user_id', type: 'uuid', nullable: false })
  userId: string;
}
