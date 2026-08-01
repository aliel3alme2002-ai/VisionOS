import { Role } from '../../domain/entities/role';

export class RoleResponseDto {
  id!: string;
  organizationId!: string | null;
  name!: string;
  description!: string | null;
  systemRole!: boolean;
  parentRoleId!: string | null;
  permissions!: string[];
  createdAt!: string;
  updatedAt!: string;
  deletedAt!: string | null;

  public static fromEntity(role: Role): RoleResponseDto {
    const dto = new RoleResponseDto();
    dto.id = role.id;
    dto.organizationId = role.organizationId;
    dto.name = role.name;
    dto.description = role.description;
    dto.systemRole = role.systemRole;
    dto.parentRoleId = role.parentRoleId;
    dto.permissions = role.permissions.map((p) => p.toPermissionString());
    dto.createdAt = role.createdAt.toISOString();
    dto.updatedAt = role.updatedAt.toISOString();
    dto.deletedAt = role.deletedAt ? role.deletedAt.toISOString() : null;
    return dto;
  }
}
