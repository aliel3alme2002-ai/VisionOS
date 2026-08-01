export interface PermissionCache {
  findRolePermissions(roleId: string): Promise<any[] | null>;
  saveRolePermissions(roleId: string, permissions: any[]): Promise<void>;
  invalidateRole(roleId: string): Promise<void>;
  invalidateAll(): Promise<void>;
}
