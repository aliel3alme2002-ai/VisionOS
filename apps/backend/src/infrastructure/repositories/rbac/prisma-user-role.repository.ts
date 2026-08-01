import { Injectable, Inject } from '@nestjs/common';
import { BaseRepository } from '../../database/base.repository';
import { UserRoleRepository } from '../../../modules/rbac/repositories/user-role.repository';
import { UserRole } from '../../../modules/rbac/domain/user-role';
import { DATABASE_CLIENT } from '../../database/prisma.module';
import { DatabaseClient } from '../../database/database-client.interface';

@Injectable()
export class PrismaUserRoleRepository extends BaseRepository implements UserRoleRepository {
  constructor(@Inject(DATABASE_CLIENT) db: DatabaseClient) {
    super(db);
  }

  public async assignRole(userId: string, roleId: string, tenantId?: string): Promise<void> {
    await this.db.client.userRole.create({
      data: {
        userId,
        roleId,
        tenantId: tenantId || null,
      },
    });
  }

  public async removeRole(userId: string, roleId: string, tenantId?: string): Promise<void> {
    await this.db.client.userRole.deleteMany({
      where: {
        userId,
        roleId,
        tenantId: tenantId || null,
      },
    });
  }

  public async findByUserId(userId: string, tenantId: string | null): Promise<UserRole[]> {
    const records = await this.db.client.userRole.findMany({
      where: {
        userId,
        tenantId, // handles global vs tenant
      },
    });
    return records.map((r: any) => this.mapToDomain(r));
  }

  public async findByRoleId(roleId: string, tenantId?: string): Promise<UserRole[]> {
    const records = await this.db.client.userRole.findMany({
      where: {
        roleId,
        tenantId: tenantId || null,
      },
    });
    return records.map((r: any) => this.mapToDomain(r));
  }

  private mapToDomain(record: any): UserRole {
    return {
      userId: record.userId,
      roleId: record.roleId,
      tenantId: record.tenantId || undefined,
    };
  }
}
