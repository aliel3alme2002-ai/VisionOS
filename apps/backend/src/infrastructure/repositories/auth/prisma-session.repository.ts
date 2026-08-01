import { Injectable, Inject } from '@nestjs/common';
import { BaseRepository } from '../../database/base.repository';
import { SessionRepository } from '../../../modules/auth/repositories/session.repository';
import { Session } from '../../../modules/auth/domain/session';
import { DATABASE_CLIENT } from '../../database/prisma.module';
import { DatabaseClient } from '../../database/database-client.interface';

@Injectable()
export class PrismaSessionRepository extends BaseRepository implements SessionRepository {
  constructor(@Inject(DATABASE_CLIENT) db: DatabaseClient) {
    super(db);
  }

  public async create(session: Session): Promise<void> {
    await this.db.client.session.create({
      data: {
        id: session.id,
        sessionId: session.id, // The domain might use 'id' as sessionId
        userId: session.userId,
        refreshTokenHash: session.refreshTokenHash,
        status: session.status,
        userAgent: session.userAgent || null,
        ipAddress: session.ipAddress || null,
        expiresAt: session.expiresAt,
        createdAt: session.createdAt,
        lastUsedAt: session.lastUsedAt,
      }
    });
  }

  public async findById(id: string): Promise<Session | null> {
    const record = await this.db.client.session.findUnique({ where: { id } });
    if (!record) return null;
    return this.mapToDomain(record);
  }

  public async findBySessionId(sessionId: string): Promise<Session | null> {
    const record = await this.db.client.session.findUnique({ where: { sessionId } });
    if (!record) return null;
    return this.mapToDomain(record);
  }

  public async findByRefreshToken(hash: string): Promise<Session | null> {
    const record = await this.db.client.session.findFirst({ where: { refreshTokenHash: hash } });
    if (!record) return null;
    return this.mapToDomain(record);
  }

  public async findAllForUser(userId: string): Promise<Session[]> {
    const records = await this.db.client.session.findMany({ where: { userId } });
    return records.map((r: any) => this.mapToDomain(r));
  }

  public async revoke(id: string): Promise<void> {
    await this.db.client.session.update({
      where: { id },
      data: { status: 'REVOKED', revokedAt: new Date() }
    });
  }

  public async revokeAllForUser(userId: string): Promise<void> {
    await this.db.client.session.updateMany({
      where: { userId, status: 'ACTIVE' },
      data: { status: 'REVOKED', revokedAt: new Date() }
    });
  }

  public async updateLastUsed(id: string): Promise<void> {
    await this.db.client.session.update({
      where: { id },
      data: { lastUsedAt: new Date() }
    });
  }

  public async updateSession(session: Session): Promise<void> {
    await this.db.client.session.update({
      where: { id: session.id },
      data: {
        refreshTokenHash: session.refreshTokenHash,
        status: session.status,
        expiresAt: session.expiresAt,
        lastUsedAt: session.lastUsedAt,
      }
    });
  }

  private mapToDomain(record: any): Session {
    return {
      id: record.id,
      sessionId: record.sessionId,
      userId: record.userId,
      refreshTokenHash: record.refreshTokenHash,
      status: record.status,
      expiresAt: record.expiresAt,
      revokedAt: record.revokedAt,
      createdAt: record.createdAt,
      lastUsedAt: record.lastUsedAt,
      userAgent: record.userAgent,
      ipAddress: record.ipAddress,
    };
  }
}
