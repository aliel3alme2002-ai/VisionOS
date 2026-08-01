import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { IOrganizationRepository } from '../../../../modules/organizations/domain/repositories/organization.repository';
import { Organization } from '../../../../modules/organizations/domain/entities/organization';
import { OrganizationMapper, RawOrganizationRecord } from './organization.mapper';

@Injectable()
export class PrismaOrganizationRepository implements IOrganizationRepository {
  constructor(private readonly prisma: PrismaService) {}

  private get delegate() {
    return this.prisma.getDelegate<RawOrganizationRecord>('organization');
  }

  async save(organization: Organization): Promise<void> {
    const data = OrganizationMapper.toPrisma(organization);
    await this.delegate.upsert({
      where: { id: organization.id },
      create: data,
      update: data,
    });
  }

  async findById(id: string, includeDeleted = false): Promise<Organization | null> {
    const raw = await this.delegate.findUnique({ where: { id } });
    if (!raw) return null;
    const org = OrganizationMapper.toDomain(raw);
    if (!includeDeleted && org.deletedAt !== null) return null;
    return org;
  }

  async findBySlug(slug: string): Promise<Organization | null> {
    const raw = await this.delegate.findUnique({ where: { slug } });
    if (!raw) return null;
    return OrganizationMapper.toDomain(raw);
  }

  async findAll(includeDeleted = false): Promise<Organization[]> {
    const list = await this.delegate.findMany();
    return list
      .map((r: RawOrganizationRecord) => OrganizationMapper.toDomain(r))
      .filter((o: Organization) => includeDeleted || o.deletedAt === null);
  }

  async existsBySlug(slug: string): Promise<boolean> {
    const count = await this.delegate.count({ where: { slug } });
    return count > 0;
  }
}
