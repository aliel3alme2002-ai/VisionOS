import { Zone } from '../domain/entities/zone';

export class ZoneResponseDto {
  id!: string;
  organizationId!: string;
  cameraId!: string;
  name!: string;
  polygon!: { x: number; y: number }[];
  type!: string;

  public static fromEntity(zone: Zone): ZoneResponseDto {
    const dto = new ZoneResponseDto();
    dto.id = zone.id;
    dto.organizationId = zone.organizationId;
    dto.cameraId = zone.cameraId;
    dto.name = zone.name;
    dto.polygon = zone.polygon;
    dto.type = zone.type.getValue();
    return dto;
  }
}
