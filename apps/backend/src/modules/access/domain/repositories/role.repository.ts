import { Role } from '../entities/role';

export interface IRoleRepository {
  save(role: Role): Promise<void>;
  findById(id: string, includeDeleted?: boolean): Promise<Role | null>;
  findByName(name: string, organizationId?: string | null): Promise<Role | null>;
  findByOrgId(organizationId?: string | null, includeDeleted?: boolean): Promise<Role[]>;
}
