import { Injectable } from '@nestjs/common';
import { SessionStorageRepository } from '../repository/session-storage.repository';
import { Session } from 'express-session';

@Injectable()
export class SessionStorageService {
  constructor(private readonly sessionRepository: SessionStorageRepository) {}

  //create new session
  async generateNewSession(time: Date, userId: string, session: Session) {
    const fetchSessionId = await this.sessionRepository.fetchRecentUserSession(
      userId,
      time,
      session.id,
    );
    if (fetchSessionId) return true;
    session['userId'] = userId;
    session.cookie.expires = time;
    await this.sessionRepository.save({
      userId,
      sessionId: session.id,
      expireAt: time,
    });
    return true;
  }
}
