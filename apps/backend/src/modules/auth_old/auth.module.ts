import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PasswordService } from './services/password.service';
import { TokenService } from './services/token.service';
import { SessionManager } from './services/session-manager.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { IdentityFactory } from './domain/identity.factory';

import { AUTH_AUDIT_SERVICE } from './interfaces/auth-audit.service.interface';
import { AUTH_EVENT_BUS } from './interfaces/auth-event-bus.interface';
import { AuthService } from './services/auth.service';
import { RefreshService } from './services/refresh.service';
import { SessionService } from './services/session.service';
import { ClockService } from './services/clock.service';

// Dummy repositories for Audit and EventBus until persistence implementation

const dummyAuditService = {
  provide: AUTH_AUDIT_SERVICE,
  useValue: {
    logLogin: async () => {},
    logFailure: async () => {},
    logSessionCreated: async () => {},
    logRefresh: async () => {},
    logRefreshReuse: async () => {},
    logSessionRevoked: async () => {},
    logSessionExpired: async () => {},
    logSessionCompromised: async () => {},
    logSessionViewed: async () => {},
  },
};

const dummyEventBus = {
  provide: AUTH_EVENT_BUS,
  useValue: {
    publish: async () => {},
  },
};

@Module({
  imports: [
    PassportModule,
    JwtModule.register({}),
  ],
  providers: [
    PasswordService,
    TokenService,
    SessionManager,
    SessionService,
    IdentityFactory,
    AuthService,
    RefreshService,
    ClockService,
    JwtStrategy,
    JwtAuthGuard,
    dummyAuditService,
    dummyEventBus,
  ],
  exports: [
    PasswordService,
    TokenService,
    SessionManager,
    SessionService,
    JwtAuthGuard,
    AuthService,
    RefreshService,
  ],
})
export class AuthModule {}
