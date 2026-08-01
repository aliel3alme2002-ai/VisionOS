export interface UserRole {
  readonly userId: string;
  readonly roleId: string;
  readonly tenantId: string | null;
}
