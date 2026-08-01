import { Injectable, Inject } from '@nestjs/common';
import { JwtProvider, JwtPayload } from '../contracts/jwt-provider';
import { RefreshTokenStore } from '../contracts/refresh-token-store';
import { UnauthorizedException } from '../../../application/common/exceptions/unauthorized.exception';

@Injectable()
export class TokenService {
  constructor(
    @Inject('JwtProvider') private readonly jwtProvider: JwtProvider,
    @Inject('RefreshTokenStore') private readonly refreshTokenStore: RefreshTokenStore,
  ) {}

  public async generateTokens(payload: JwtPayload): Promise<{ accessToken: string; refreshToken: string; expiresAt: Date }> {
    const accessToken = await this.jwtProvider.sign(payload, '15m');
    const refreshTokenPayload = { ...payload, type: 'refresh' };
    const refreshToken = await this.jwtProvider.sign(refreshTokenPayload, '7d');
    
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await this.refreshTokenStore.store({
      token: refreshToken,
      userId: payload.sub,
      expiresAt,
      revoked: false,
    });

    return { accessToken, refreshToken, expiresAt };
  }

  public async rotateRefreshToken(oldToken: string): Promise<{ accessToken: string; refreshToken: string; expiresAt: Date }> {
    const record = await this.refreshTokenStore.findByToken(oldToken);
    if (!record || record.revoked || record.expiresAt < new Date()) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    const payload = await this.jwtProvider.verify(oldToken);
    
    // Revoke old token
    await this.refreshTokenStore.revoke(oldToken);
    
    // Generate new tokens
    const newPayload: JwtPayload = { sub: payload.sub };
    if (payload.org !== undefined) newPayload.org = payload.org;
    if (payload.roles !== undefined) newPayload.roles = payload.roles;
    if (payload.permissions !== undefined) newPayload.permissions = payload.permissions;
    return this.generateTokens(newPayload);
  }

  public async revokeAllUserTokens(userId: string): Promise<void> {
    await this.refreshTokenStore.revokeAllForUser(userId);
  }
}
