export enum SessionStatus {
  ACTIVE = 'ACTIVE',
  REVOKED = 'REVOKED',
  EXPIRED = 'EXPIRED',
  COMPROMISED = 'COMPROMISED',
}

export interface Session {
  readonly id: string;
  readonly userId: string;
  readonly sessionId: string;
  readonly refreshTokenHash: string;
  readonly expiresAt: Date;
  readonly revokedAt?: Date | undefined;
  readonly createdAt: Date;
  readonly lastUsedAt: Date;
  readonly status: SessionStatus;
  readonly ipAddress?: string | undefined;
  readonly userAgent?: string | undefined;
  readonly deviceName?: string | undefined;
  readonly platform?: string | undefined;
  readonly browser?: string | undefined;
}
