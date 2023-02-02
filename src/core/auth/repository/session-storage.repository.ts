import { EntityRepository } from 'typeorm';
import { SessionStorageEntity } from '../entity/session-storage.entity';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

@EntityRepository(SessionStorageEntity)
export class SessionStorageRepository extends BaseRepository<SessionStorageEntity> {
  async fetchRecentUserSession(userId: string, time: Date, sessionId: string) {
    const fetchSession = await this.query(
      `
        select session.session_id as "sessionId"
        from sh_client_session_storage session
        inner join sh_client_user_profile profile
            on profile.id = session.user_id
        where session.expire_at >= $2::timestamp and
            session.session_id = $3 and
            session.user_id = $1 and
            profile.is_active is true and profile.is_deleted is false and
            session.is_active is true and session.is_deleted is false
        limit 1;
    `,
      [userId, time, sessionId],
    );
    return fetchSession.length ? fetchSession[0] : null;
  }
}
