import { EntityRepository } from 'typeorm';
import { ClientPasswordEntity } from './client-password.entity';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

@EntityRepository(ClientPasswordEntity)
export class ClientPasswordRepository extends BaseRepository<ClientPasswordEntity> {
  async checkRecentlyChangedPassword(password: string, userId: string) {
    const fetchPasswordStatus = await this.query(
      `
            select $1
            not in (
                select password from sh_client_password
                where user_id = $2
                order by created_at desc
                limit 3
            ) as "status";
        `,
      [password, userId],
    );
    return fetchPasswordStatus.length
      ? fetchPasswordStatus[0].status
        ? true
        : false
      : false;
  }
}
