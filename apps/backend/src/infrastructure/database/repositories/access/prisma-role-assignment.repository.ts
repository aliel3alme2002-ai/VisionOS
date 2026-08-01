import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { IRoleAssignmentRepository } from '../../../../modules/access/domain/repositories/role-assignment.repository';
import { RoleAssignment } from '../../../../modules/access/domain/entities/role-assignment';
import { AccessMapper, RawRoleAssignmentRecord } from './access.mapper';

@Injectable()
export class PrismaRoleAssignmentRepository implements IRoleAssignmentRepository {
  constructor(private readonly prisma: PrismaService) {}

  private get delegate() {
    return this.prisma.getDelegate<RawRoleAssignmentRecord>('roleAssignment');
  }

  async save(assignment: RoleAssignment): Promise<void> {
    const data = AccessMapper.roleAssignmentToPrisma(assignment);
    await this.delegate.upsert({
      where: { id: assignment.id },
      create: data,
      update: data,
    });
  }

  async delete(userId: string, roleId: string, organizationId: string): Promise<void> {
    await this.delegate.deleteMany({
      where: { userId, roleId, organizationId },
    });
  }

  async findByUserAndOrg(userId: string, organizationId: string): Promise<RoleAssignment[]> {
    const list = await this.delegate.findMany({
      where: { userId, organizationId },
    });
    return list
      .map((r: RawRoleAssignmentRecord) => AccessMapper.roleAssignmentToDomain(r))
      .filter((a: RoleAssignment) => !a.isExpired());
  }
}
