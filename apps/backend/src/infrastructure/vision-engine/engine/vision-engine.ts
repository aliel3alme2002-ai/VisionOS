import { Injectable } from '@nestjs/common';
import { VisionManager } from './vision-manager';
import { VisionRequest } from '../models/vision-request';
import { VisionResult } from '../models/vision-result';
import { VisionSession } from './vision-session';
import { VisionMonitor } from '../monitoring/vision-monitor';

@Injectable()
export class VisionEngine {
  constructor(
    private readonly manager: VisionManager,
    private readonly monitor: VisionMonitor,
  ) {}

  public async initializeEngine(): Promise<boolean> {
    return true;
  }

  public async startPipeline(request: VisionRequest): Promise<VisionSession | null> {
    return this.manager.startVisionSession(request);
  }

  public async stopPipeline(cameraId: string): Promise<boolean> {
    return this.manager.stopVisionSession(cameraId);
  }

  public async executeFrame(request: VisionRequest, frameIndex: number): Promise<VisionResult> {
    this.monitor.recordFrameReceived();
    return this.manager.processSingleFrameTick(request, frameIndex);
  }

  public getEngineStatistics() {
    return this.monitor.getStatistics();
  }
}
