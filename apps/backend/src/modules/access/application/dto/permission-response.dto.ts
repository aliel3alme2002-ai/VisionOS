import { Permission } from '../../domain/entities/permission';

export class PermissionResponseDto {
  id!: string;
  resource!: string;
  action!: string;
  scope!: string;
  permissionString!: string;
  description!: string | null;

  public static fromEntity(perm: Permission): PermissionResponseDto {
    const dto = new PermissionResponseDto();
    dto.id = perm.id;
    dto.resource = perm.resource;
    dto.action = perm.action;
    dto.scope = perm.scope.getValue();
    dto.permissionString = perm.toPermissionString();
    dto.description = perm.description;
    return dto;
  }
}
