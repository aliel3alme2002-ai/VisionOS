import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthController } from './controllers/auth.controller';

import { LoginHandler } from './application/commands/login/login.handler';
import { LogoutHandler } from './application/commands/logout/logout.handler';
import { RefreshTokenHandler } from './application/commands/refresh-token/refresh-token.handler';
import { ChangePasswordHandler } from './application/commands/change-password/change-password.handler';
import { ForgotPasswordHandler } from './application/commands/forgot-password/forgot-password.handler';
import { ResetPasswordHandler } from './application/commands/reset-password/reset-password.handler';
import { MeHandler } from './application/queries/me/me.handler';

import { PasswordService } from './domain/services/password.service';
import { TokenService } from './domain/services/token.service';

const CommandHandlers = [
  LoginHandler,
  LogoutHandler,
  RefreshTokenHandler,
  ChangePasswordHandler,
  ForgotPasswordHandler,
  ResetPasswordHandler,
];

const QueryHandlers = [
  MeHandler,
];

@Module({
  imports: [CqrsModule],
  controllers: [AuthController],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    PasswordService,
    TokenService,
    // Provide dummy implementations for Contracts so the module compiles and can be injected
    {
      provide: 'PasswordHasher',
      useValue: {
        hash: async (pass: string) => `hashed_${pass}`,
        compare: async () => true,
      }
    },
    {
      provide: 'JwtProvider',
      useValue: {
        sign: async () => 'dummy_token',
        verify: async () => ({ sub: 'dummy_sub' }),
      }
    },
    {
      provide: 'RefreshTokenStore',
      useValue: {
        store: async () => {},
        revoke: async () => {},
        revokeAllForUser: async () => {},
        findByToken: async () => null,
      }
    }
  ],
})
export class AuthModule {}
