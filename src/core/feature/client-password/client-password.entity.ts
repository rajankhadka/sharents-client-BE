import { CommonEntity } from 'src/common/entity/common.entity';
import { UserProfileEntity } from 'src/core/user-management/entity/user-profile.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { EPASSWORDREMARK } from './client-password.dto';

@Entity({ name: 'sh_client_password' })
export class ClientPasswordEntity extends CommonEntity {
  @Column({
    name: 'remark',
    type: 'enum',
    nullable: false,
    enum: EPASSWORDREMARK,
  })
  remark: EPASSWORDREMARK;

  @Column({ type: 'varchar', name: 'password', length: 400, nullable: false })
  password: string;

  @ManyToOne(() => UserProfileEntity)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserProfileEntity;

  @Column({ type: 'uuid', name: 'user_id', nullable: false })
  userId: string;
}
