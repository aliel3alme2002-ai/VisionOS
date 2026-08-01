import { Injectable } from '@nestjs/common';
import { FrameBuffer } from '../frame/frame-buffer';
import { FrameRateController } from './frame-rate-controller';
import { Frame } from '../frame/frame';
import { FrameBatch } from '../frame/frame-batch';

@Injectable()
export class FrameScheduler {
  constructor(
    private readonly buffer: FrameBuffer,
    private readonly fpsController: FrameRateController,
  ) {}

  public scheduleFrame(frame: Frame, sourceFps = 30, targetFps = 30): boolean {
    if (this.fpsController.shouldSkipFrame(frame.index, sourceFps, targetFps)) {
      return false;
    }
    return this.buffer.push(frame);
  }

  public getNextBatch(batchSize: number, sourceId: string): FrameBatch | null {
    const frames: Frame[] = [];
    while (frames.length < batchSize && this.buffer.size() > 0) {
      const frame = this.buffer.pop();
      if (frame) frames.push(frame);
    }

    if (frames.length === 0) return null;

    return new FrameBatch({
      batchId: `batch-${Date.now()}`,
      sourceId,
      frames,
      createdAt: new Date(),
    });
  }
}
