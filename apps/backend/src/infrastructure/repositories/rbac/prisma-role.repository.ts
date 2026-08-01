import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { RoleRepository } from '../../../modules/rbac/repositories/role.repository';
import { Role } from '../../../modules/rbac/domain/role';

@Injectable()
export class PrismaRoleRepository implements RoleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Role | null> {
    const data = await this.prisma.client.role.findUnique({ where: { id } });
    if (!data) return null;
    return {
      id: data.id,
      name: data.name,
      description: data.description ?? '',
      isSystem: data.systemRole,
      tenantId: data.organizationId ?? null,
    };
  }

  async findByIds(ids: string[]): Promise<Role[]> {
    const list = await this.prisma.client.role.findMany({
      where: { id: { in: ids } },
    });
    return list.map((data) => ({
      id: data.id,
      name: data.name,
      description: data.description ?? '',
      isSystem: data.systemRole,
      tenantId: data.organizationId ?? null,
    }));
  }

  async findByTenantId(tenantId: string | null): Promise<Role[]> {
    const list = await this.prisma.client.role.findMany({
      where: { organizationId: tenantId ?? null },
    });
    return list.map((data) => ({
      id: data.id,
      name: data.name,
      description: data.description ?? '',
      isSystem: data.systemRole,
      tenantId: data.organizationId ?? null,
    }));
  }
}
