import { Injectable } from '@nestjs/common';
import { VisionStatistics } from './vision-statistics';

@Injectable()
export class VisionMonitor {
  private framesReceived = 0;
  private framesDecoded = 0;
  private framesProcessed = 0;
  private inferenceCount = 0;
  private totalDetectionCount = 0;
  private totalTrackingCount = 0;
  private droppedFrames = 0;
  private totalPipelineTimeMs = 0;

  public recordFrameReceived(): void {
    this.framesReceived++;
  }

  public recordFrameDecoded(): void {
    this.framesDecoded++;
  }

  public recordFrameProcessed(pipelineTimeMs: number, detectionsCount: number, tracksCount: number): void {
    this.framesProcessed++;
    this.inferenceCount++;
    this.totalDetectionCount += detectionsCount;
    this.totalTrackingCount += tracksCount;
    this.totalPipelineTimeMs += pipelineTimeMs;
  }

  public recordFrameDropped(): void {
    this.droppedFrames++;
  }

  public getStatistics(): VisionStatistics {
    const avgTime = this.framesProcessed > 0 ? this.totalPipelineTimeMs / this.framesProcessed : 0;
    const fps = avgTime > 0 ? 1000 / avgTime : 0;

    return new VisionStatistics({
      framesReceived: this.framesReceived,
      framesDecoded: this.framesDecoded,
      framesProcessed: this.framesProcessed,
      inferenceCount: this.inferenceCount,
      detectionCount: this.totalDetectionCount,
      trackingCount: this.totalTrackingCount,
      droppedFrames: this.droppedFrames,
      averagePipelineTimeMs: avgTime,
      processingFps: fps,
      detectionFps: fps,
      trackingFps: fps,
      timestamp: new Date(),
    });
  }
}
