import { CommonEntity } from 'src/common/entity/common.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity({ name: 'sh_client_user_profile' })
@Index('user_profile_email_unique_index', ['email'], {
  unique: true,
  where: 'where (is_deleted is false)',
})
@Index('user_profile_phone_number_unique_index', ['phoneNumber'], {
  unique: true,
  where: 'where (is_deleted is false)',
})
export class UserProfileEntity extends CommonEntity {
  @Column({ type: 'varchar', name: 'first_name', length: 50, nullable: false })
  firstName: string;

  @Column({ type: 'varchar', name: 'middle_name', length: 50, nullable: true })
  middleName: string;

  @Column({ type: 'varchar', name: 'last_name', length: 50, nullable: false })
  lastName: string;

  @Column({
    type: 'varchar',
    name: 'user_name',
    length: 50,
    nullable: false,
    unique: true,
  })
  userName: string;

  @Column({ type: 'varchar', name: 'email', length: 100, nullable: false })
  email: string;

  @Column({
    type: 'varchar',
    name: 'phone_number',
    length: 50,
    nullable: false,
  })
  phoneNumber: string;

  @Column({ type: 'varchar', name: 'password', length: 400, nullable: false })
  password: string;
}
