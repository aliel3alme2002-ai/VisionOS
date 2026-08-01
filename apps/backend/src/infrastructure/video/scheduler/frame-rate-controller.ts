import { Injectable } from '@nestjs/common';

@Injectable()
export class FrameRateController {
  public shouldSkipFrame(frameIndex: number, sourceFps: number, targetFps: number): boolean {
    if (targetFps >= sourceFps) return false;
    const skipRatio = Math.round(sourceFps / targetFps);
    return frameIndex % skipRatio !== 0;
  }
}
