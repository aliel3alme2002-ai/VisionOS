import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { SessionManager } from './session-manager.service';
import { ClockService } from './clock.service';
import { AuthAuditService, AUTH_AUDIT_SERVICE } from '../interfaces/auth-audit.service.interface';
import { AuthEventBus, AUTH_EVENT_BUS } from '../interfaces/auth-event-bus.interface';
import { Session, SessionStatus } from '../domain/session';
import { SessionResponse, SessionListResponse } from '../dto/auth.dto';
import { SessionRevoked, SessionViewed } from '../events/auth.events';
import { Identity } from '../domain/identity';

@Injectable()
export class SessionService {
  constructor(
    private readonly sessionManager: SessionManager,
    private readonly clockService: ClockService,
    @Inject(AUTH_AUDIT_SERVICE) private readonly auditService: AuthAuditService,
    @Inject(AUTH_EVENT_BUS) private readonly eventBus: AuthEventBus,
  ) {}

  public async getCurrentSession(identity: Identity): Promise<SessionResponse> {
    if (!identity.sessionId) {
      throw new UnauthorizedException('No active session');
    }

    const session = await this.sessionManager.getBySessionId(identity.sessionId);
    this.validateSession(session, identity);

    await this.auditService.logSessionViewed(identity.sessionId, identity.userId);
    await this.eventBus.publish(new SessionViewed(
      identity.userId,
      identity.tenantId,
      identity.sessionId,
      this.clockService.now(),
      'INFO'
    ));

    return this.mapToResponse(session!);
  }

  public async getSessionById(identity: Identity, targetSessionId: string): Promise<SessionResponse> {
    const session = await this.sessionManager.getBySessionId(targetSessionId);
    this.validateSession(session, identity);

    await this.auditService.logSessionViewed(targetSessionId, identity.userId);
    await this.eventBus.publish(new SessionViewed(
      identity.userId,
      identity.tenantId,
      targetSessionId,
      this.clockService.now(),
      'INFO'
    ));

    return this.mapToResponse(session!);
  }

  public async listActiveSessions(identity: Identity): Promise<SessionListResponse> {
    // Requires SessionRepository.findAllForUser which we need to add to SessionManager
    const sessions = await this.sessionManager.listActiveSessions(identity.userId);
    
    // We only return sessions that belong to the current tenant if multitenancy strictly separates it
    // But since Identity maps user to tenant, usually sessions are per user.
    return {
      sessions: sessions.map(s => this.mapToResponse(s)),
    };
  }

  public async revokeSession(identity: Identity, targetSessionId: string): Promise<void> {
    const session = await this.sessionManager.getBySessionId(targetSessionId);
    this.validateSession(session, identity); // ensures ownership

    await this.sessionManager.revokeSession(session!.id);
    
    await this.auditService.logSessionRevoked(targetSessionId, identity.userId, 'USER_REQUESTED');
    await this.eventBus.publish(new SessionRevoked(
      identity.userId,
      identity.tenantId,
      targetSessionId,
      this.clockService.now(),
      'INFO'
    ));
  }

  public async revokeAllSessions(identity: Identity): Promise<void> {
    await this.sessionManager.revokeAllSessions(identity.userId);
    
    // Log for current session at least, or global audit
    if (identity.sessionId) {
      await this.auditService.logSessionRevoked(identity.sessionId, identity.userId, 'ALL_SESSIONS_REVOKED');
      await this.eventBus.publish(new SessionRevoked(
        identity.userId,
        identity.tenantId,
        identity.sessionId,
        this.clockService.now(),
        'WARNING'
      ));
    }
  }

  public async terminateOtherSessions(identity: Identity): Promise<void> {
    if (!identity.sessionId) return;
    
    // Get all active sessions
    const sessions = await this.sessionManager.listActiveSessions(identity.userId);
    for (const session of sessions) {
      if (session.sessionId !== identity.sessionId) {
        await this.sessionManager.revokeSession(session.id);
        await this.auditService.logSessionRevoked(session.sessionId, identity.userId, 'TERMINATE_OTHER');
        await this.eventBus.publish(new SessionRevoked(
          identity.userId,
          identity.tenantId,
          session.sessionId,
          this.clockService.now(),
          'INFO'
        ));
      }
    }
  }

  private validateSession(session: Session | null, identity: Identity): void {
    if (!session) {
      throw new UnauthorizedException('Session not found');
    }
    if (session.userId !== identity.userId) {
      throw new UnauthorizedException('Session not found');
    }
    
    // Check status
    if (session.status === SessionStatus.REVOKED || session.revokedAt) {
      throw new UnauthorizedException('Session not found');
    }
    if (session.status === SessionStatus.COMPROMISED) {
      throw new UnauthorizedException('Session not found');
    }
    if (session.status === SessionStatus.EXPIRED || session.expiresAt < this.clockService.now()) {
      throw new UnauthorizedException('Session not found');
    }
  }

  private mapToResponse(session: Session): SessionResponse {
    let computedStatus = session.status;
    if (computedStatus === SessionStatus.ACTIVE) {
      if (session.revokedAt) {
        computedStatus = SessionStatus.REVOKED;
      } else if (session.expiresAt < this.clockService.now()) {
        computedStatus = SessionStatus.EXPIRED;
      }
    }

    return {
      sessionId: session.sessionId,
      deviceName: session.deviceName,
      platform: session.platform,
      browser: session.browser,
      ipAddress: session.ipAddress,
      userAgent: session.userAgent,
      createdAt: session.createdAt,
      lastUsedAt: session.lastUsedAt,
      expiresAt: session.expiresAt,
      status: computedStatus,
    };
  }
}
