import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { LoginRequest, LoginResponse } from '../dto/auth.dto';
import { PasswordService } from './password.service';
import { SessionManager } from './session-manager.service';
import { TokenService, TokenPair } from './token.service';
import { ClockService } from './clock.service';
import { UserRepository, USER_REPOSITORY } from '../repositories/user.repository';
import { AuthAuditService, AUTH_AUDIT_SERVICE } from '../interfaces/auth-audit.service.interface';
import { AuthEventBus, AUTH_EVENT_BUS } from '../interfaces/auth-event-bus.interface';
import { User } from '../domain/user';
import { Session } from '../domain/session';
import { Identity } from '../domain/identity';
import { UserLoggedIn, LoginFailed } from '../events/auth.events';

export interface RequestMetadata {
  ipAddress?: string;
  userAgent?: string;
  deviceName?: string;
  platform?: string;
  browser?: string;
}

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
    @Inject(AUTH_AUDIT_SERVICE) private readonly auditService: AuthAuditService,
    @Inject(AUTH_EVENT_BUS) private readonly eventBus: AuthEventBus,
    private readonly passwordService: PasswordService,
    private readonly sessionManager: SessionManager,
    private readonly tokenService: TokenService,
    private readonly clockService: ClockService,
  ) {}

  public async login(request: LoginRequest, metadata: RequestMetadata): Promise<LoginResponse> {
    const user = await this.validateUser(request.email);
    this.validateStatus(user);

    await this.verifyPassword(user, request.password, metadata.ipAddress);

    // According to architecture, create logical session first (or allocate its ID)
    const sessionId = require('node:crypto').randomUUID();
    
    // Generate Token Pair
    const identity: Identity = {
      userId: user.id,
      tenantId: user.tenantId,
      sessionId,
      tokenVersion: 1,
      roles: user.roles,
    };
    const tokens = await this.tokenService.generateTokenPair(identity);

    // Hash refresh token for session storage
    const refreshTokenHash = await this.passwordService.hash(tokens.refreshToken);

    // Persist Session
    const session = await this.sessionManager.createSession(user.id, sessionId, refreshTokenHash, tokens.refreshExpiresAt, metadata);
    // Override the internally generated sessionId with ours if necessary, 
    // or just assume createSession uses the randomUUID internally. 
    // Wait, SessionManager.createSession generates its own sessionId. Let's update SessionManager to accept it, or we just use it.
    // For now, let's fix SessionManager.

    await this.publishAuthEvent(user, session);
    await this.auditService.logLogin(user.id, session.sessionId, metadata.ipAddress);

    return this.buildLoginResponse(user, tokens);
  }

  private async validateUser(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      // Intentionally obfuscated reason
      await this.auditService.logFailure(email, 'USER_NOT_FOUND');
      await this.eventBus.publish(new LoginFailed(email, 'USER_NOT_FOUND', undefined, this.clockService.now()));
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  private validateStatus(user: User): void {
    if (user.status !== 'ACTIVE') {
      // Intentionally obfuscated reason
      this.auditService.logFailure(user.email, user.status).catch(() => {});
      this.eventBus.publish(new LoginFailed(user.email, user.status, undefined, this.clockService.now())).catch(() => {});
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  private async verifyPassword(user: User, password: string, ipAddress?: string): Promise<void> {
    const isValid = await this.passwordService.verify(user.passwordHash, password);
    if (!isValid) {
      await this.auditService.logFailure(user.email, 'INVALID_PASSWORD', ipAddress);
      await this.eventBus.publish(new LoginFailed(user.email, 'INVALID_PASSWORD', ipAddress, this.clockService.now()));
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  private async publishAuthEvent(user: User, session: Session): Promise<void> {
    await this.eventBus.publish(new UserLoggedIn(user.id, user.tenantId, session.sessionId, this.clockService.now()));
  }

  private buildLoginResponse(user: User, tokens: TokenPair): LoginResponse {
    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      expiresIn: Math.floor((tokens.accessExpiresAt.getTime() - this.clockService.now().getTime()) / 1000),
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        tenantId: user.tenantId,
        roles: user.roles,
      },
    };
  }
}
