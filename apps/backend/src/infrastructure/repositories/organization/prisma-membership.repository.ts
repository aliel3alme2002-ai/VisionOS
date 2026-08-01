import { Injectable, Inject } from '@nestjs/common';
import { BaseRepository } from '../../database/base.repository';
import { MembershipRepository } from '../../../modules/organization/repositories/membership.repository';
import { Membership } from '../../../modules/organization/domain/membership';
import { DATABASE_CLIENT } from '../../database/prisma.module';
import { DatabaseClient } from '../../database/database-client.interface';

@Injectable()
export class PrismaMembershipRepository extends BaseRepository implements MembershipRepository {
  constructor(@Inject(DATABASE_CLIENT) db: DatabaseClient) {
    super(db);
  }

  public async findById(id: string): Promise<Membership | null> {
    const record = await this.db.client.membership.findUnique({ where: { id } });
    if (!record) return null;
    return this.mapToDomain(record);
  }

  public async findByUserId(userId: string): Promise<Membership[]> {
    const records = await this.db.client.membership.findMany({ where: { userId } });
    return records.map((r: any) => this.mapToDomain(r));
  }

  public async findByUserAndOrganization(userId: string, organizationId: string): Promise<Membership | null> {
    const record = await this.db.client.membership.findUnique({
      where: {
        userId_organizationId: {
          userId,
          organizationId,
        },
      },
    });
    if (!record) return null;
    return this.mapToDomain(record);
  }

  public async create(membership: Membership): Promise<void> {
    await this.db.client.membership.create({
      data: {
        id: membership.id,
        userId: membership.userId,
        organizationId: membership.organizationId,
        roleIds: membership.roleIds,
        status: membership.status,
        defaultHotelId: membership.defaultHotelId || null,
        defaultDepartmentId: membership.defaultDepartmentId || null,
        lastSelectedContext: membership.lastSelectedContext || null,
      },
    });
  }

  public async update(membership: Membership): Promise<void> {
    await this.db.client.membership.update({
      where: { id: membership.id },
      data: {
        roleIds: membership.roleIds,
        status: membership.status,
        defaultHotelId: membership.defaultHotelId || null,
        defaultDepartmentId: membership.defaultDepartmentId || null,
        lastSelectedContext: membership.lastSelectedContext || null,
      },
    });
  }

  private mapToDomain(record: any): Membership {
    return {
      id: record.id,
      userId: record.userId,
      organizationId: record.organizationId,
      roleIds: record.roleIds,
      status: record.status as any,
      defaultHotelId: record.defaultHotelId || undefined,
      defaultDepartmentId: record.defaultDepartmentId || undefined,
      lastSelectedContext: record.lastSelectedContext || undefined,
    };
  }
}
