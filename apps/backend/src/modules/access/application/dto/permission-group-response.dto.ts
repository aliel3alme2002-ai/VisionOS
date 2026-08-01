import { PermissionGroup } from '../../domain/entities/permission-group';

export class PermissionGroupResponseDto {
  id!: string;
  name!: string;
  description!: string | null;
  permissions!: string[];

  public static fromEntity(group: PermissionGroup): PermissionGroupResponseDto {
    const dto = new PermissionGroupResponseDto();
    dto.id = group.id;
    dto.name = group.name;
    dto.description = group.description;
    dto.permissions = group.permissions.map((p) => p.toPermissionString());
    return dto;
  }
}
