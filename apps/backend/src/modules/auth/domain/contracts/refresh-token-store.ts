export interface RefreshTokenRecord {
  token: string;
  userId: string;
  expiresAt: Date;
  revoked: boolean;
}

export interface RefreshTokenStore {
  store(record: RefreshTokenRecord): Promise<void>;
  revoke(token: string): Promise<void>;
  revokeAllForUser(userId: string): Promise<void>;
  findByToken(token: string): Promise<RefreshTokenRecord | null>;
}
