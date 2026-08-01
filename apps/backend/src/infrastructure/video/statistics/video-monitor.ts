import { Injectable } from '@nestjs/common';
import { VideoStatistics } from './video-statistics';

@Injectable()
export class VideoMonitor {
  private decodedCount = 0;
  private droppedCount = 0;
  private totalProcessingTimeMs = 0;

  public recordFrameDecoded(processingTimeMs: number): void {
    this.decodedCount++;
    this.totalProcessingTimeMs += processingTimeMs;
  }

  public recordFrameDropped(): void {
    this.droppedCount++;
  }

  public getStatistics(currentQueueDepth: number, currentFps = 30): VideoStatistics {
    const avgProcessingTime = this.decodedCount > 0 ? this.totalProcessingTimeMs / this.decodedCount : 0;
    return new VideoStatistics({
      fps: currentFps,
      decodedFrames: this.decodedCount,
      droppedFrames: this.droppedCount,
      queueDepth: currentQueueDepth,
      latency: avgProcessingTime + 2,
      processingTime: avgProcessingTime,
      timestamp: new Date(),
    });
  }
}
