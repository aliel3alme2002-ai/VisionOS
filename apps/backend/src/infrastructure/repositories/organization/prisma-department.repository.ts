import { Injectable, Inject } from '@nestjs/common';
import { BaseRepository } from '../../database/base.repository';
import { DepartmentRepository } from '../../../modules/organization/repositories/department.repository';
import { Department } from '../../../modules/organization/domain/department';
import { DATABASE_CLIENT } from '../../database/prisma.module';
import { DatabaseClient } from '../../database/database-client.interface';

@Injectable()
export class PrismaDepartmentRepository extends BaseRepository implements DepartmentRepository {
  constructor(@Inject(DATABASE_CLIENT) db: DatabaseClient) {
    super(db);
  }

  public async findById(id: string, organizationId: string): Promise<Department | null> {
    const record = await this.db.client.department.findFirst({
      where: { id, organizationId },
    });
    if (!record) return null;
    return this.mapToDomain(record);
  }

  public async findByOrganizationId(organizationId: string): Promise<Department[]> {
    const records = await this.db.client.department.findMany({
      where: { organizationId },
    });
    return records.map((r: any) => this.mapToDomain(r));
  }

  public async create(department: Department): Promise<void> {
    await this.db.client.department.create({
      data: {
        id: department.id,
        organizationId: department.organizationId,
        name: department.name,
        code: department.code,
        description: department.description,
      },
    });
  }

  private mapToDomain(record: any): Department {
    return {
      id: record.id,
      organizationId: record.organizationId,
      name: record.name,
      code: record.code,
      description: record.description,
    };
  }
}
