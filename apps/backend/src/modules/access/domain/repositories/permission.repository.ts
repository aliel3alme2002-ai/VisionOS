import { Permission } from '../entities/permission';

export interface IPermissionRepository {
  save(permission: Permission): Promise<void>;
  findById(id: string): Promise<Permission | null>;
  findByResourceAndAction(resource: string, action: string, scope?: string): Promise<Permission | null>;
  findAll(): Promise<Permission[]>;
}
