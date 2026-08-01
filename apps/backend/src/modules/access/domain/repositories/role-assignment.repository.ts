import { RoleAssignment } from '../entities/role-assignment';

export interface IRoleAssignmentRepository {
  save(assignment: RoleAssignment): Promise<void>;
  delete(userId: string, roleId: string, organizationId: string): Promise<void>;
  findByUserAndOrg(userId: string, organizationId: string): Promise<RoleAssignment[]>;
}
