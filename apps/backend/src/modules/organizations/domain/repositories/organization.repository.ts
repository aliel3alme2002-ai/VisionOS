import { Organization } from '../entities/organization';

export interface IOrganizationRepository {
  save(organization: Organization): Promise<void>;
  findById(id: string, includeDeleted?: boolean): Promise<Organization | null>;
  findBySlug(slug: string): Promise<Organization | null>;
  findAll(includeDeleted?: boolean): Promise<Organization[]>;
  existsBySlug(slug: string): Promise<boolean>;
}
