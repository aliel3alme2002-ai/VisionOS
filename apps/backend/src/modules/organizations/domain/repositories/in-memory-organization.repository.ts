import { Injectable } from '@nestjs/common';
import { IOrganizationRepository } from './organization.repository';
import { Organization } from '../entities/organization';

@Injectable()
export class InMemoryOrganizationRepository implements IOrganizationRepository {
  private readonly storage = new Map<string, Organization>();

  async save(organization: Organization): Promise<void> {
    this.storage.set(organization.id, organization);
  }

  async findById(id: string, includeDeleted = false): Promise<Organization | null> {
    const org = this.storage.get(id);
    if (!org) return null;
    if (!includeDeleted && org.status.isDeleted()) return null;
    return org;
  }

  async findBySlug(slug: string): Promise<Organization | null> {
    for (const org of this.storage.values()) {
      if (org.slug.getValue() === slug) {
        return org;
      }
    }
    return null;
  }

  async findAll(includeDeleted = false): Promise<Organization[]> {
    const list: Organization[] = [];
    for (const org of this.storage.values()) {
      if (includeDeleted || !org.status.isDeleted()) {
        list.push(org);
      }
    }
    return list;
  }

  async existsBySlug(slug: string): Promise<boolean> {
    const org = await this.findBySlug(slug);
    return org !== null;
  }
}
