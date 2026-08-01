import { Injectable } from '@nestjs/common';
import { VisionSession } from './vision-session';
import { VisionScheduler } from '../scheduler/vision-scheduler';
import { PipelineWorker } from '../scheduler/pipeline-worker';
import { VisionPipeline } from '../pipeline/vision-pipeline';
import { FrameExtractor } from '../../video/frame/frame-extractor';
import { VisionRequest } from '../models/vision-request';
import { VisionResult } from '../models/vision-result';

@Injectable()
export class VisionManager {
  private readonly sessions: Map<string, VisionSession> = new Map();

  constructor(
    private readonly scheduler: VisionScheduler,
    private readonly pipeline: VisionPipeline,
    private readonly frameExtractor: FrameExtractor,
  ) {}

  public async startVisionSession(request: VisionRequest): Promise<VisionSession | null> {
    const session = new VisionSession({
      sessionId: request.sessionId,
      cameraId: request.cameraId,
      rtspUrl: request.rtspUrl,
      modelId: request.modelId,
      state: 'RUNNING',
      createdAt: new Date(),
    });

    const worker = new PipelineWorker(this.pipeline, this.frameExtractor);
    const allocated = this.scheduler.allocateWorker(request.cameraId, worker);

    if (!allocated) {
      session.state = 'ERROR';
      return session;
    }

    this.sessions.set(request.cameraId, session);
    return session;
  }

  public async stopVisionSession(cameraId: string): Promise<boolean> {
    const session = this.sessions.get(cameraId);
    if (!session) return false;

    session.state = 'STOPPED';
    this.scheduler.releaseWorker(cameraId);
    this.sessions.delete(cameraId);
    return true;
  }

  public async processSingleFrameTick(
    request: VisionRequest,
    frameIndex: number,
  ): Promise<VisionResult> {
    const ptsMs = frameIndex * (1000 / request.targetFps);
    const frame = this.frameExtractor.extractFrame(request.cameraId, frameIndex, ptsMs);
    return this.pipeline.executePipeline(frame, request.modelId, request.enableTracking);
  }

  public getSession(cameraId: string): VisionSession | null {
    return this.sessions.get(cameraId) ?? null;
  }
}
