import { Role } from '../../../../modules/access/domain/entities/role';
import { Permission } from '../../../../modules/access/domain/entities/permission';
import { PermissionGroup } from '../../../../modules/access/domain/entities/permission-group';
import { RoleAssignment } from '../../../../modules/access/domain/entities/role-assignment';
import { PermissionScope } from '../../../../modules/access/domain/entities/permission-scope';

export interface RawRoleRecord {
  id: string;
  organizationId?: string | null;
  name: string;
  description?: string | null;
  systemRole?: boolean;
  parentRoleId?: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export interface RawPermissionRecord {
  id: string;
  resource: string;
  action: string;
  scope?: string;
  description?: string | null;
}

export interface RawPermissionGroupRecord {
  id: string;
  name: string;
  description?: string | null;
}

export interface RawRoleAssignmentRecord {
  id: string;
  userId: string;
  roleId: string;
  organizationId: string;
  assignedBy: string;
  assignedAt: Date;
  expiresAt?: Date | null;
}

export class AccessMapper {
  public static roleToDomain(raw: RawRoleRecord): Role {
    return new Role({
      id: raw.id,
      organizationId: raw.organizationId ?? null,
      name: raw.name,
      description: raw.description ?? null,
      systemRole: raw.systemRole ?? false,
      parentRoleId: raw.parentRoleId ?? null,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      deletedAt: raw.deletedAt ?? null,
    });
  }

  public static roleToPrisma(domain: Role): RawRoleRecord {
    return {
      id: domain.id,
      name: domain.name,
      description: domain.description,
      systemRole: domain.systemRole,
      parentRoleId: domain.parentRoleId,
      organizationId: domain.organizationId,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }

  public static permissionToDomain(raw: RawPermissionRecord): Permission {
    return new Permission({
      id: raw.id,
      resource: raw.resource,
      action: raw.action,
      scope: PermissionScope.create(raw.scope ?? 'ORGANIZATION'),
      description: raw.description ?? null,
    });
  }

  public static permissionToPrisma(domain: Permission): RawPermissionRecord {
    return {
      id: domain.id,
      resource: domain.resource,
      action: domain.action,
      scope: domain.scope.getValue(),
      description: domain.description,
    };
  }

  public static permissionGroupToDomain(raw: RawPermissionGroupRecord): PermissionGroup {
    return new PermissionGroup({
      id: raw.id,
      name: raw.name,
      description: raw.description ?? null,
    });
  }

  public static roleAssignmentToDomain(raw: RawRoleAssignmentRecord): RoleAssignment {
    return new RoleAssignment({
      id: raw.id,
      userId: raw.userId,
      roleId: raw.roleId,
      organizationId: raw.organizationId,
      assignedBy: raw.assignedBy,
      assignedAt: raw.assignedAt,
      expiresAt: raw.expiresAt ?? null,
    });
  }

  public static roleAssignmentToPrisma(domain: RoleAssignment): RawRoleAssignmentRecord {
    return {
      id: domain.id,
      userId: domain.userId,
      roleId: domain.roleId,
      organizationId: domain.organizationId,
      assignedBy: domain.assignedBy,
      assignedAt: domain.assignedAt,
      expiresAt: domain.expiresAt,
    };
  }
}
