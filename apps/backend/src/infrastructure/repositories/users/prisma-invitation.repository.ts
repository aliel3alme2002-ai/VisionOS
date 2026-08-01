import { Injectable, Inject } from '@nestjs/common';
import { BaseRepository } from '../../database/base.repository';
import { InvitationRepository } from '../../../modules/users/repositories/invitation.repository';
import { Invitation } from '../../../modules/users/domain/invitation';
import { DATABASE_CLIENT } from '../../database/prisma.module';
import { DatabaseClient } from '../../database/database-client.interface';

@Injectable()
export class PrismaInvitationRepository extends BaseRepository implements InvitationRepository {
  constructor(@Inject(DATABASE_CLIENT) db: DatabaseClient) {
    super(db);
  }

  public async findById(id: string): Promise<Invitation | null> {
    const record = await this.db.client.invitation.findUnique({ where: { id } });
    if (!record) return null;
    return this.mapToDomain(record);
  }

  public async findByToken(token: string): Promise<Invitation | null> {
    const record = await this.db.client.invitation.findUnique({ where: { token } });
    if (!record) return null;
    return this.mapToDomain(record);
  }

  public async findByEmailAndOrganization(email: string, organizationId: string): Promise<Invitation | null> {
    const record = await this.db.client.invitation.findFirst({
      where: { email, organizationId },
      orderBy: { createdAt: 'desc' },
    });
    if (!record) return null;
    return this.mapToDomain(record);
  }

  public async create(invitation: Invitation): Promise<void> {
    await this.db.client.invitation.create({
      data: {
        id: invitation.id,
        organizationId: invitation.organizationId,
        email: invitation.email,
        invitedBy: invitation.invitedBy,
        token: invitation.token,
        status: invitation.status,
        expiresAt: invitation.expiresAt,
      },
    });
  }

  public async update(invitation: Invitation): Promise<void> {
    await this.db.client.invitation.update({
      where: { id: invitation.id },
      data: {
        status: invitation.status,
      },
    });
  }

  private mapToDomain(record: any): Invitation {
    return {
      id: record.id,
      organizationId: record.organizationId,
      email: record.email,
      invitedBy: record.invitedBy,
      token: record.token,
      status: record.status as any,
      expiresAt: record.expiresAt,
    };
  }
}
