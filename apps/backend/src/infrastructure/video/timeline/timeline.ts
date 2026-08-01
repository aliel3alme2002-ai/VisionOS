import { Injectable } from '@nestjs/common';

@Injectable()
export class VideoTimeline {
  private durationMs = 0;
  private currentPtsMs = 0;
  private totalFrames = 0;

  public initialize(durationMs: number, totalFrames: number): void {
    this.durationMs = durationMs;
    this.totalFrames = totalFrames;
    this.currentPtsMs = 0;
  }

  public seek(ptsMs: number): number {
    this.currentPtsMs = Math.max(0, Math.min(ptsMs, this.durationMs));
    return this.currentPtsMs;
  }

  public getCurrentPosition(): number {
    return this.currentPtsMs;
  }

  public getDuration(): number {
    return this.durationMs;
  }

  public getTotalFrames(): number {
    return this.totalFrames;
  }

  public getFrameIndexForPts(ptsMs: number, targetFps = 30): number {
    return Math.floor((ptsMs / 1000) * targetFps);
  }
}
