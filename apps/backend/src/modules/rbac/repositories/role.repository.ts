import { Role } from '../domain/role';

export const ROLE_REPOSITORY = Symbol('ROLE_REPOSITORY');

export interface RoleRepository {
  findById(id: string): Promise<Role | null>;
  findByIds(ids: string[]): Promise<Role[]>;
  findByTenantId(tenantId: string | null): Promise<Role[]>;
}
