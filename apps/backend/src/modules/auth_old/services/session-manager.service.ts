import { Injectable, Inject } from '@nestjs/common';
import { Session, SessionStatus } from '../domain/session';
import { SessionRepository, SESSION_REPOSITORY } from '../repositories/session.repository';
import { randomUUID } from 'node:crypto';

@Injectable()
export class SessionManager {
  constructor(
    @Inject(SESSION_REPOSITORY) private readonly sessionRepository: SessionRepository,
  ) {}

  public async createSession(userId: string, sessionId: string, refreshTokenHash: string, expiresAt: Date, metadata: { ipAddress?: string; userAgent?: string; deviceName?: string; platform?: string; browser?: string }): Promise<Session> {
    const session: Session = {
      id: randomUUID(),
      userId,
      sessionId,
      refreshTokenHash,
      expiresAt,
      createdAt: new Date(),
      lastUsedAt: new Date(),
      status: SessionStatus.ACTIVE,
      ipAddress: metadata.ipAddress,
      userAgent: metadata.userAgent,
      deviceName: metadata.deviceName,
      platform: metadata.platform,
      browser: metadata.browser,
    };

    await this.sessionRepository.create(session);
    return session;
  }

  public async rotateSession(session: Session, newRefreshTokenHash: string, newExpiresAt: Date, metadata: { ipAddress?: string; userAgent?: string }): Promise<Session> {
    const updatedSession: Session = {
      ...session,
      refreshTokenHash: newRefreshTokenHash,
      expiresAt: newExpiresAt,
      lastUsedAt: new Date(),
      ipAddress: metadata.ipAddress || session.ipAddress,
      userAgent: metadata.userAgent || session.userAgent,
    };
    await this.sessionRepository.updateSession(updatedSession);
    return updatedSession;
  }

  public async getBySessionId(sessionId: string): Promise<Session | null> {
    return this.sessionRepository.findBySessionId(sessionId);
  }

  public async listActiveSessions(userId: string): Promise<Session[]> {
    const sessions = await this.sessionRepository.findAllForUser(userId);
    return sessions.filter(s => s.status === SessionStatus.ACTIVE && !s.revokedAt && s.expiresAt > new Date());
  }

  public async revokeSession(id: string): Promise<void> {
    await this.sessionRepository.revoke(id);
  }

  public async revokeAllSessions(userId: string): Promise<void> {
    await this.sessionRepository.revokeAllForUser(userId);
  }
}
