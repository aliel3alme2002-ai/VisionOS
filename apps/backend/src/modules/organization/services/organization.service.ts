import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Organization } from '../domain/organization';
import { OrganizationRepository, ORGANIZATION_REPOSITORY } from '../repositories/organization.repository';
import { randomUUID } from 'node:crypto';

@Injectable()
export class OrganizationService {
  constructor(
    @Inject(ORGANIZATION_REPOSITORY) private readonly organizationRepository: OrganizationRepository,
  ) {}

  public async getOrganization(id: string): Promise<Organization> {
    const org = await this.organizationRepository.findById(id);
    if (!org) {
      throw new NotFoundException('Organization not found');
    }
    return org;
  }

  public async createOrganization(name: string, slug: string): Promise<Organization> {
    const org: Organization = {
      id: randomUUID(),
      name,
      slug,
      status: 'ACTIVE',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await this.organizationRepository.create(org);
    return org;
  }

  public async validateHierarchy(organizationId: string): Promise<boolean> {
    const org = await this.organizationRepository.findById(organizationId);
    return !!org && org.status === 'ACTIVE';
  }
}
