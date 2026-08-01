import { Occupancy } from '../domain/entities/occupancy';

export class OccupancyResponseDto {
  id!: string;
  zoneId!: string;
  currentCount!: number;
  maxCapacity!: number;
  updatedAt!: string;

  public static fromEntity(occ: Occupancy): OccupancyResponseDto {
    const dto = new OccupancyResponseDto();
    dto.id = occ.id;
    dto.zoneId = occ.zoneId;
    dto.currentCount = occ.currentCount;
    dto.maxCapacity = occ.maxCapacity;
    dto.updatedAt = occ.updatedAt.toISOString();
    return dto;
  }
}
