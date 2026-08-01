import { Injectable } from '@nestjs/common';
import { IRoleRepository } from './role.repository';
import { IPermissionRepository } from './permission.repository';
import { IPermissionGroupRepository } from './permission-group.repository';
import { IRoleAssignmentRepository } from './role-assignment.repository';

import { Role } from '../entities/role';
import { Permission } from '../entities/permission';
import { PermissionGroup } from '../entities/permission-group';
import { RoleAssignment } from '../entities/role-assignment';

@Injectable()
export class InMemoryRoleRepository implements IRoleRepository {
  private readonly storage = new Map<string, Role>();

  async save(role: Role): Promise<void> { this.storage.set(role.id, role); }
  async findById(id: string, includeDeleted = false): Promise<Role | null> {
    const role = this.storage.get(id);
    if (!role) return null;
    if (!includeDeleted && role.isDeleted()) return null;
    return role;
  }
  async findByName(name: string, organizationId?: string | null): Promise<Role | null> {
    for (const role of this.storage.values()) {
      if (role.name.toLowerCase() === name.toLowerCase() && role.organizationId === (organizationId ?? null)) {
        return role;
      }
    }
    return null;
  }
  async findByOrgId(organizationId?: string | null, includeDeleted = false): Promise<Role[]> {
    const res: Role[] = [];
    for (const role of this.storage.values()) {
      if ((organizationId === undefined || role.organizationId === organizationId) && (includeDeleted || !role.isDeleted())) {
        res.push(role);
      }
    }
    return res;
  }
}

@Injectable()
export class InMemoryPermissionRepository implements IPermissionRepository {
  private readonly storage = new Map<string, Permission>();

  async save(permission: Permission): Promise<void> { this.storage.set(permission.id, permission); }
  async findById(id: string): Promise<Permission | null> { return this.storage.get(id) ?? null; }
  async findByResourceAndAction(resource: string, action: string, scope?: string): Promise<Permission | null> {
    for (const p of this.storage.values()) {
      if (p.resource === resource.toLowerCase() && p.action === action.toLowerCase()) {
        if (!scope || p.scope.getValue().toLowerCase() === scope.toLowerCase()) {
          return p;
        }
      }
    }
    return null;
  }
  async findAll(): Promise<Permission[]> { return Array.from(this.storage.values()); }
}

@Injectable()
export class InMemoryPermissionGroupRepository implements IPermissionGroupRepository {
  private readonly storage = new Map<string, PermissionGroup>();

  async save(group: PermissionGroup): Promise<void> { this.storage.set(group.id, group); }
  async findById(id: string): Promise<PermissionGroup | null> { return this.storage.get(id) ?? null; }
  async findAll(): Promise<PermissionGroup[]> { return Array.from(this.storage.values()); }
}

@Injectable()
export class InMemoryRoleAssignmentRepository implements IRoleAssignmentRepository {
  private readonly assignments: RoleAssignment[] = [];

  async save(assignment: RoleAssignment): Promise<void> { this.assignments.push(assignment); }
  async delete(userId: string, roleId: string, organizationId: string): Promise<void> {
    const idx = this.assignments.findIndex(
      (a) => a.userId === userId && a.roleId === roleId && a.organizationId === organizationId,
    );
    if (idx !== -1) this.assignments.splice(idx, 1);
  }
  async findByUserAndOrg(userId: string, organizationId: string): Promise<RoleAssignment[]> {
    return this.assignments.filter((a) => a.userId === userId && a.organizationId === organizationId && !a.isExpired());
  }
}
