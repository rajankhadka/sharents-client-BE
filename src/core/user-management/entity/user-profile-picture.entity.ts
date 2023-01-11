import { CommonEntity } from 'src/common/entity/common.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserProfileEntity } from './user-profile.entity';

@Entity({ name: 'sh_client_user_profile_picture' })
export class UserProfilePictureEntity extends CommonEntity {
  @Column({
    type: 'varchar',
    name: 'file_name',
    length: 100,
    nullable: false,
  })
  fileName: string;

  @Column({
    type: 'varchar',
    name: 'file_path',
    length: 500,
    nullable: false,
  })
  filePath: string;

  /**
    file size in byte
   **/
  @Column({
    type: 'int',
    name: 'file_size',
    nullable: false,
  })
  fileSize: number;

  @Column({
    type: 'varchar',
    name: 'file_type',
    length: 100,
    nullable: false,
  })
  fileType: string;

  //many to one relation on user-profile entity
  @ManyToOne(() => UserProfileEntity)
  @JoinColumn({ name: 'user_profile_id', referencedColumnName: 'id' })
  userProfile: UserProfileEntity;

  @Column({ type: 'uuid', name: 'user_profile_id', nullable: false })
  userProfileId: string;
}
