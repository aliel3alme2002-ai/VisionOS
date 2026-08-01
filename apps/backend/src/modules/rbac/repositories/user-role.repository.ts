import { UserRole } from '../domain/user-role';

export const USER_ROLE_REPOSITORY = Symbol('USER_ROLE_REPOSITORY');

export interface UserRoleRepository {
  findByUserId(userId: string, tenantId: string | null): Promise<UserRole[]>;
}
