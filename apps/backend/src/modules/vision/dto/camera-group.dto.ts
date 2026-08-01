import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CameraGroup } from '../domain/entities/camera-group';

export class CreateCameraGroupDto {
  @IsString()
  @IsNotEmpty()
  organizationId!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsOptional()
  description?: string;
}

export class CameraGroupResponseDto {
  id!: string;
  organizationId!: string;
  name!: string;
  description!: string | null;

  public static fromEntity(group: CameraGroup): CameraGroupResponseDto {
    const dto = new CameraGroupResponseDto();
    dto.id = group.id;
    dto.organizationId = group.organizationId;
    dto.name = group.name;
    dto.description = group.description;
    return dto;
  }
}
