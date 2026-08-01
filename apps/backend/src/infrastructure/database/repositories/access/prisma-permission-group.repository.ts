import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { IPermissionGroupRepository } from '../../../../modules/access/domain/repositories/permission-group.repository';
import { PermissionGroup } from '../../../../modules/access/domain/entities/permission-group';
import { AccessMapper, RawPermissionGroupRecord } from './access.mapper';

@Injectable()
export class PrismaPermissionGroupRepository implements IPermissionGroupRepository {
  constructor(private readonly prisma: PrismaService) {}

  private get delegate() {
    return this.prisma.getDelegate<RawPermissionGroupRecord>('permissionGroup');
  }

  async save(group: PermissionGroup): Promise<void> {
    await this.delegate.upsert({
      where: { id: group.id },
      create: { id: group.id, name: group.name, description: group.description },
      update: { name: group.name, description: group.description },
    });
  }

  async findById(id: string): Promise<PermissionGroup | null> {
    const raw = await this.delegate.findUnique({ where: { id } });
    if (!raw) return null;
    return AccessMapper.permissionGroupToDomain(raw);
  }

  async findAll(): Promise<PermissionGroup[]> {
    const list = await this.delegate.findMany();
    return list.map((r: RawPermissionGroupRecord) => AccessMapper.permissionGroupToDomain(r));
  }
}
