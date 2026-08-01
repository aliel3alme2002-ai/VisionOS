import { Injectable } from '@nestjs/common';
import { FfmpegStatistics } from './ffmpeg-statistics';
import { FfmpegState } from '../models/ffmpeg-state';

@Injectable()
export class FfmpegHealth {
  private readonly statsMap: Map<string, FfmpegStatistics> = new Map();

  public updateStatistics(
    streamId: string,
    state: FfmpegState,
    fps: number,
    decodedFrames: number,
    droppedFrames: number,
    reconnectCount: number,
  ): FfmpegStatistics {
    const stats = new FfmpegStatistics({
      streamId,
      fps: state === 'RUNNING' ? fps : 0,
      bitrateKbps: 4096,
      decodedFrames,
      droppedFrames,
      reconnectCount,
      cpuUsagePercent: 12.4,
      memoryUsageMb: 85.2,
      timestamp: new Date(),
    });

    this.statsMap.set(streamId, stats);
    return stats;
  }

  public getStatistics(streamId: string): FfmpegStatistics | null {
    return this.statsMap.get(streamId) ?? null;
  }
}
