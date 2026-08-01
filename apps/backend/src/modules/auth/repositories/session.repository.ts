import { Session } from '../domain/session';

export const SESSION_REPOSITORY = Symbol('SESSION_REPOSITORY');

export interface SessionRepository {
  create(session: Session): Promise<void>;
  findById(id: string): Promise<Session | null>;
  findBySessionId(sessionId: string): Promise<Session | null>;
  findByRefreshToken(hash: string): Promise<Session | null>;
  findAllForUser(userId: string): Promise<Session[]>;
  revoke(id: string): Promise<void>;
  revokeAllForUser(userId: string): Promise<void>;
  updateLastUsed(id: string): Promise<void>;
  updateSession(session: Session): Promise<void>;
}
