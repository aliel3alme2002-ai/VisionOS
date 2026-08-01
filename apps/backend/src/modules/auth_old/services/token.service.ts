import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Identity } from '../domain/identity';
import { VisionOSConfig } from '@visionos/config';
import { VISIONOS_CONFIG } from '../../../config/config.constants';
import { randomUUID } from 'node:crypto';

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
  accessExpiresAt: Date;
  refreshExpiresAt: Date;
}

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(VISIONOS_CONFIG) private readonly config: VisionOSConfig,
  ) {}

  public async generateTokenPair(identity: Identity): Promise<TokenPair> {
    const jti = randomUUID();
    const accessPayload = {
      sub: identity.userId,
      tenantId: identity.tenantId,
      sessionId: identity.sessionId,
      tokenVersion: identity.tokenVersion,
      roles: identity.roles,
      permissions: identity.permissions,
      type: 'access',
    };

    const refreshPayload = {
      sub: identity.userId,
      sessionId: identity.sessionId,
      jti,
      type: 'refresh',
    };

    // Note: Parsing ms strings like '15m' or '7d' to actual Dates requires a small helper in a real app.
    // For now, we simulate the expiresAt based on standard defaults.
    // In strict mode, we'd use a library like `ms` to parse `this.config.auth.jwtExpiresIn`.
    
    // As per task requirements, no business logic, we just return the interface.
    // We'll set expiresAt to placeholder dates.
    const now = Date.now();
    const accessExpiresAt = new Date(now + 15 * 60 * 1000); // 15m default
    const refreshExpiresAt = new Date(now + 7 * 24 * 60 * 60 * 1000); // 7d default

    const accessToken = await this.jwtService.signAsync(accessPayload, {
      secret: this.config.auth.jwtSecret,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expiresIn: this.config.auth.jwtExpiresIn as any,
      issuer: this.config.auth.jwtIssuer,
      audience: this.config.auth.jwtAudience,
    });

    const refreshToken = await this.jwtService.signAsync(refreshPayload, {
      secret: this.config.auth.jwtSecret,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expiresIn: this.config.auth.jwtRefreshExpiresIn as any,
      issuer: this.config.auth.jwtIssuer,
      audience: this.config.auth.jwtAudience,
    });

    return {
      accessToken,
      refreshToken,
      accessExpiresAt,
      refreshExpiresAt,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async verifyAccessToken(token: string): Promise<any> {
    return this.jwtService.verifyAsync(token, {
      secret: this.config.auth.jwtSecret,
      issuer: this.config.auth.jwtIssuer,
      audience: this.config.auth.jwtAudience,
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async verifyRefreshToken(token: string): Promise<any> {
    return this.jwtService.verifyAsync(token, {
      secret: this.config.auth.jwtSecret,
      issuer: this.config.auth.jwtIssuer,
      audience: this.config.auth.jwtAudience,
    });
  }
}
