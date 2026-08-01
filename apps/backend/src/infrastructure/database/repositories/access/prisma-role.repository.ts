import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { IRoleRepository } from '../../../../modules/access/domain/repositories/role.repository';
import { Role } from '../../../../modules/access/domain/entities/role';
import { AccessMapper, RawRoleRecord } from './access.mapper';

@Injectable()
export class PrismaRoleRepository implements IRoleRepository {
  constructor(private readonly prisma: PrismaService) {}

  private get delegate() {
    return this.prisma.getDelegate<RawRoleRecord>('role');
  }

  async save(role: Role): Promise<void> {
    const data = AccessMapper.roleToPrisma(role);
    await this.delegate.upsert({
      where: { id: role.id },
      create: data,
      update: data,
    });
  }

  async findById(id: string, includeDeleted = false): Promise<Role | null> {
    const raw = await this.delegate.findUnique({ where: { id } });
    if (!raw) return null;
    const role = AccessMapper.roleToDomain(raw);
    if (!includeDeleted && role.isDeleted()) return null;
    return role;
  }

  async findByName(name: string, organizationId?: string | null): Promise<Role | null> {
    const raw = await this.delegate.findFirst({
      where: { name, organizationId: organizationId ?? null },
    });
    if (!raw) return null;
    return AccessMapper.roleToDomain(raw);
  }

  async findByOrgId(organizationId?: string | null, includeDeleted = false): Promise<Role[]> {
    const list = await this.delegate.findMany({
      where: organizationId !== undefined ? { organizationId } : {},
    });
    return list
      .map((r: RawRoleRecord) => AccessMapper.roleToDomain(r))
      .filter((r: Role) => includeDeleted || !r.isDeleted());
  }
}
