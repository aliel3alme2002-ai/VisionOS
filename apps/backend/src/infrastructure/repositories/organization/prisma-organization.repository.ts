import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { OrganizationRepository } from '../../../modules/organization/repositories/organization.repository';
import { Organization } from '../../../modules/organization/domain/organization';

@Injectable()
export class PrismaOrganizationRepository implements OrganizationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Organization | null> {
    const data = await this.prisma.client.organization.findUnique({ where: { id } });
    if (!data) return null;
    return {
      id: data.id,
      name: data.name,
      slug: data.slug,
      status: data.status as 'ACTIVE' | 'INACTIVE' | 'SUSPENDED',
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  async findBySlug(slug: string): Promise<Organization | null> {
    const data = await this.prisma.client.organization.findUnique({ where: { slug } });
    if (!data) return null;
    return {
      id: data.id,
      name: data.name,
      slug: data.slug,
      status: data.status as 'ACTIVE' | 'INACTIVE' | 'SUSPENDED',
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  async create(organization: Organization): Promise<void> {
    await this.prisma.client.organization.create({
      data: {
        id: organization.id,
        name: organization.name,
        slug: organization.slug,
        ownerId: 'default-owner',
        status: organization.status,
        createdAt: organization.createdAt,
        updatedAt: organization.updatedAt,
      },
    });
  }

  async update(organization: Organization): Promise<void> {
    await this.prisma.client.organization.update({
      where: { id: organization.id },
      data: {
        name: organization.name,
        slug: organization.slug,
        status: organization.status,
        updatedAt: organization.updatedAt,
      },
    });
  }
}
