import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { IPermissionRepository } from '../../../../modules/access/domain/repositories/permission.repository';
import { Permission } from '../../../../modules/access/domain/entities/permission';
import { AccessMapper, RawPermissionRecord } from './access.mapper';

@Injectable()
export class PrismaPermissionRepository implements IPermissionRepository {
  constructor(private readonly prisma: PrismaService) {}

  private get delegate() {
    return this.prisma.getDelegate<RawPermissionRecord>('permission');
  }

  async save(permission: Permission): Promise<void> {
    const data = AccessMapper.permissionToPrisma(permission);
    await this.delegate.upsert({
      where: { id: permission.id },
      create: data,
      update: data,
    });
  }

  async findById(id: string): Promise<Permission | null> {
    const raw = await this.delegate.findUnique({ where: { id } });
    if (!raw) return null;
    return AccessMapper.permissionToDomain(raw);
  }

  async findByResourceAndAction(resource: string, action: string, scope?: string): Promise<Permission | null> {
    const raw = await this.delegate.findFirst({
      where: { resource, action, ...(scope ? { scope } : {}) },
    });
    if (!raw) return null;
    return AccessMapper.permissionToDomain(raw);
  }

  async findAll(): Promise<Permission[]> {
    const list = await this.delegate.findMany();
    return list.map((r: RawPermissionRecord) => AccessMapper.permissionToDomain(r));
  }
}
