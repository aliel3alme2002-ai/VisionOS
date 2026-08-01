import { Injectable, Inject } from '@nestjs/common';
import { IRoleRepository } from '../repositories/role.repository';
import { IRoleAssignmentRepository } from '../repositories/role-assignment.repository';

export interface EvaluationRequest {
  userId: string;
  organizationId: string;
  requiredPermission: string; // e.g. "camera.read:organization"
  resourceOwnerId?: string;
}

export interface EvaluationResult {
  allowed: boolean;
  reason?: string;
  resolvedPermissions: string[];
}

@Injectable()
export class AccessEvaluationService {
  constructor(
    @Inject('IRoleRepository') private readonly roleRepository: IRoleRepository,
    @Inject('IRoleAssignmentRepository') private readonly assignmentRepository: IRoleAssignmentRepository,
  ) {}

  public async evaluate(req: EvaluationRequest): Promise<EvaluationResult> {
    const assignments = await this.assignmentRepository.findByUserAndOrg(req.userId, req.organizationId);
    if (!assignments || assignments.length === 0) {
      return { allowed: false, reason: 'No active role assignments found for user', resolvedPermissions: [] };
    }

    const resolvedPermissionsSet = new Set<string>();

    for (const assignment of assignments) {
      await this.collectRolePermissions(assignment.roleId, resolvedPermissionsSet);
    }

    const resolvedPermissions = Array.from(resolvedPermissionsSet);

    const [reqResourceAction, reqScope] = req.requiredPermission.split(':');
    
    for (const permStr of resolvedPermissions) {
      const [permResourceAction, permScope] = permStr.split(':');
      if (permResourceAction === reqResourceAction) {
        if (permScope === 'any' || permScope === reqScope) {
          return { allowed: true, resolvedPermissions };
        }
        if (permScope === 'organization' && (reqScope === 'assigned' || reqScope === 'self')) {
          return { allowed: true, resolvedPermissions };
        }
        if (permScope === 'self' && req.resourceOwnerId && req.userId === req.resourceOwnerId) {
          return { allowed: true, resolvedPermissions };
        }
      }
    }

    return {
      allowed: false,
      reason: `User does not possess required permission '${req.requiredPermission}'`,
      resolvedPermissions,
    };
  }

  private async collectRolePermissions(roleId: string, acc: Set<string>): Promise<void> {
    const role = await this.roleRepository.findById(roleId);
    if (!role || role.isDeleted()) return;

    for (const perm of role.permissions) {
      acc.add(perm.toPermissionString());
    }

    // Role Hierarchy traversal
    if (role.parentRoleId) {
      await this.collectRolePermissions(role.parentRoleId, acc);
    }
  }
}
