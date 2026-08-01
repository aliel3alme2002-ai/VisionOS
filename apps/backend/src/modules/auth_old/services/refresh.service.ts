import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { RefreshRequest, RefreshResponse } from '../dto/auth.dto';
import { TokenService } from './token.service';
import { SessionManager } from './session-manager.service';
import { PasswordService } from './password.service';
import { ClockService } from './clock.service';
import { AuthAuditService, AUTH_AUDIT_SERVICE } from '../interfaces/auth-audit.service.interface';
import { AuthEventBus, AUTH_EVENT_BUS } from '../interfaces/auth-event-bus.interface';
import { Session } from '../domain/session';
import { IdentityFactory } from '../domain/identity.factory';
import { SessionUpdated, SessionRevoked, RefreshTokenRotated, RefreshTokenReuseDetected } from '../events/auth.events';
import { UserRepository, USER_REPOSITORY } from '../repositories/user.repository';

export interface RefreshMetadata {
  ipAddress?: string;
  userAgent?: string;
}

@Injectable()
export class RefreshService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly sessionManager: SessionManager,
    private readonly passwordService: PasswordService,
    private readonly clockService: ClockService,
    private readonly identityFactory: IdentityFactory,
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
    @Inject(AUTH_AUDIT_SERVICE) private readonly auditService: AuthAuditService,
    @Inject(AUTH_EVENT_BUS) private readonly eventBus: AuthEventBus,
  ) {}

  public async refresh(request: RefreshRequest, metadata: RefreshMetadata): Promise<RefreshResponse> {
    let payload;
    try {
      payload = await this.tokenService.verifyRefreshToken(request.refreshToken);
    } catch {
      throw new UnauthorizedException('Invalid token');
    }

    if (payload.type !== 'refresh') {
      throw new UnauthorizedException('Invalid token');
    }

    const sessionId = payload.sessionId;
    if (!sessionId) {
      throw new UnauthorizedException('Invalid token');
    }

    const session = await this.sessionManager.getBySessionId(sessionId);
    this.validateSession(session, payload.sub);

    // If typescript is happy, we know session exists because of validateSession.
    // However, TS doesn't know validateSession throws, so we assert it.
    if (!session) {
      throw new UnauthorizedException('Invalid token');
    }

    const isValidToken = await this.passwordService.verify(session.refreshTokenHash, request.refreshToken);
    if (!isValidToken) {
      await this.handleTokenReuse(session, metadata);
      throw new UnauthorizedException('Invalid token'); // Intentionally generic
    }

    const user = await this.userRepository.findById(session.userId);
    if (!user || user.status !== 'ACTIVE') {
      throw new UnauthorizedException('Invalid token');
    }

    // Generate new tokens
    const identity = this.identityFactory.fromJwtPayload({
      sub: user.id,
      tenantId: user.tenantId,
      sessionId: session.sessionId,
      tokenVersion: 1, // Optional logic: Increment tokenVersion if implementing global revocation
      roles: user.roles,
      permissions: undefined, // Handled by RBAC module later
    });

    const tokens = await this.tokenService.generateTokenPair(identity);
    const newHash = await this.passwordService.hash(tokens.refreshToken);

    const updatedSession = await this.sessionManager.rotateSession(session, newHash, tokens.refreshExpiresAt, metadata);

    await this.publishRotationEvents(updatedSession, metadata);

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  private validateSession(session: Session | null, userId: string): void {
    if (!session) {
      throw new UnauthorizedException('Invalid token');
    }
    if (session.userId !== userId) {
      throw new UnauthorizedException('Invalid token');
    }
    if (session.revokedAt) {
      throw new UnauthorizedException('Invalid token');
    }
    if (session.expiresAt < this.clockService.now()) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private async handleTokenReuse(session: Session, metadata: RefreshMetadata): Promise<void> {
    await this.sessionManager.revokeSession(session.id);
    
    await this.auditService.logRefreshReuse(session.userId, session.sessionId, metadata.ipAddress);
    await this.auditService.logSessionRevoked(session.sessionId, session.userId, 'REFRESH_TOKEN_REUSE');
    
    await this.eventBus.publish(new RefreshTokenReuseDetected(
      session.userId,
      undefined, // tenantId missing
      session.sessionId,
      this.clockService.now(),
      metadata.ipAddress,
      metadata.userAgent
    ));
    await this.eventBus.publish(new SessionRevoked(
      session.userId,
      undefined,
      session.sessionId,
      this.clockService.now(),
      'CRITICAL',
      metadata.ipAddress,
      metadata.userAgent
    ));
  }

  private async publishRotationEvents(session: Session, metadata: RefreshMetadata): Promise<void> {
    await this.auditService.logRefresh(session.userId, session.sessionId, metadata.ipAddress);
    
    await this.eventBus.publish(new RefreshTokenRotated(
      session.userId,
      undefined,
      session.sessionId,
      this.clockService.now(),
      metadata.ipAddress,
      metadata.userAgent
    ));
    await this.eventBus.publish(new SessionUpdated(
      session.userId,
      undefined,
      session.sessionId,
      this.clockService.now(),
      metadata.ipAddress,
      metadata.userAgent
    ));
  }
}
