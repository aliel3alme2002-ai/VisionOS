import { Permission } from '../domain/permission';

export const PERMISSION_REPOSITORY = Symbol('PERMISSION_REPOSITORY');

export interface PermissionRepository {
  findAll(): Promise<Permission[]>;
  findByIds(ids: string[]): Promise<Permission[]>;
  findByRole(roleId: string): Promise<Permission[]>;
  findByRoles(roleIds: string[]): Promise<Permission[]>;
}
