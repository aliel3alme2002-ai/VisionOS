import { Heatmap } from '../domain/entities/heatmap';

export class HeatmapResponseDto {
  id!: string;
  cameraId!: string;
  timeRange!: string;
  grid!: number[][];

  public static fromEntity(hm: Heatmap): HeatmapResponseDto {
    const dto = new HeatmapResponseDto();
    dto.id = hm.id;
    dto.cameraId = hm.cameraId;
    dto.timeRange = hm.timeRange;
    dto.grid = hm.grid;
    return dto;
  }
}
