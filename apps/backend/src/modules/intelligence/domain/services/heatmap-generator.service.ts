import { Injectable } from '@nestjs/common';
import { Heatmap } from '../entities/heatmap';
import { randomUUID } from 'crypto';

@Injectable()
export class HeatmapGeneratorService {
  public generate(cameraId: string, timeRange: string): Heatmap {
    const grid: number[][] = Array(10).fill(0).map(() => Array(10).fill(0));
    const r2 = grid[2];
    if (r2) r2[3] = 15;
    const r5 = grid[5];
    if (r5) r5[5] = 42;
    return new Heatmap({
      id: randomUUID(),
      cameraId,
      timeRange,
      grid,
    });
  }
}
