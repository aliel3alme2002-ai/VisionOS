import { Injectable, Inject } from '@nestjs/common';
import { BaseRepository } from '../../database/base.repository';
import { PermissionRepository } from '../../../modules/rbac/repositories/permission.repository';
import { Permission } from '../../../modules/rbac/domain/permission';
import { DATABASE_CLIENT } from '../../database/prisma.module';
import { DatabaseClient } from '../../database/database-client.interface';

@Injectable()
export class PrismaPermissionRepository extends BaseRepository implements PermissionRepository {
  constructor(@Inject(DATABASE_CLIENT) db: DatabaseClient) {
    super(db);
  }

  public async findAll(): Promise<Permission[]> {
    const records = await this.db.client.permission.findMany();
    return records.map((r: any) => this.mapToDomain(r));
  }

  public async findByIds(ids: string[]): Promise<Permission[]> {
    const records = await this.db.client.permission.findMany({
      where: { id: { in: ids } },
    });
    return records.map((r: any) => this.mapToDomain(r));
  }

  public async findByRole(roleId: string): Promise<Permission[]> {
    // @ts-ignore
    const id = roleId;
    return [];
  }

  public async findByRoles(roleIds: string[]): Promise<Permission[]> {
    // @ts-ignore
    const ids = roleIds;
    return [];
  }

  private mapToDomain(record: any): Permission {
    return {
      id: record.id,
      module: record.module,
      resource: record.resource,
      action: record.action,
      identifier: record.identifier,
      description: record.description,
      group: record.group,
      isSystem: record.isSystem,
    };
  }
}
