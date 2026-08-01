import { PermissionGroup } from '../entities/permission-group';

export interface IPermissionGroupRepository {
  save(group: PermissionGroup): Promise<void>;
  findById(id: string): Promise<PermissionGroup | null>;
  findAll(): Promise<PermissionGroup[]>;
}
