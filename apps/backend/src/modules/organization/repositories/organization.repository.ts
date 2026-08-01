import { Organization } from '../domain/organization';

export const ORGANIZATION_REPOSITORY = Symbol('ORGANIZATION_REPOSITORY');

export interface OrganizationRepository {
  findById(id: string): Promise<Organization | null>;
  findBySlug(slug: string): Promise<Organization | null>;
  create(organization: Organization): Promise<void>;
  update(organization: Organization): Promise<void>;
}
