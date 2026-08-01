import { Injectable } from '@nestjs/common';
import { VisionPipeline } from '../pipeline/vision-pipeline';
import { VisionRequest } from '../models/vision-request';
import { VisionResult } from '../models/vision-result';
import { FrameExtractor } from '../../video/frame/frame-extractor';

@Injectable()
export class PipelineWorker {
  private isAlive = false;

  constructor(
    private readonly pipeline: VisionPipeline,
    private readonly frameExtractor: FrameExtractor,
  ) {}

  public async runWorkerLoop(
    request: VisionRequest,
    frameCount = 10,
    onResult?: (result: VisionResult) => void,
  ): Promise<void> {
    this.isAlive = true;

    for (let i = 0; i < frameCount && this.isAlive; i++) {
      const ptsMs = i * (1000 / request.targetFps);
      const frame = this.frameExtractor.extractFrame(request.cameraId, i, ptsMs);

      const result = await this.pipeline.executePipeline(frame, request.modelId, request.enableTracking);
      if (onResult) {
        onResult(result);
      }
    }

    this.isAlive = false;
  }

  public stop(): void {
    this.isAlive = false;
  }

  public getIsAlive(): boolean {
    return this.isAlive;
  }
}
