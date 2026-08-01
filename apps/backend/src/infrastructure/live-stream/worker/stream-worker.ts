import { Injectable } from '@nestjs/common';
import { StreamPipeline } from '../pipeline/stream-pipeline';
import { StreamRequest } from '../models/stream-request';
import { StreamResult } from '../models/stream-result';

@Injectable()
export class StreamWorker {
  private isRunning = false;

  constructor(private readonly pipeline: StreamPipeline) {}

  public async executeWorkerLoop(request: StreamRequest, frameCount = 10): Promise<StreamResult> {
    this.isRunning = true;
    let lastResult: StreamResult | null = null;

    for (let i = 0; i < frameCount && this.isRunning; i++) {
      lastResult = await this.pipeline.processStreamTick(request, i);
    }

    this.isRunning = false;
    return (
      lastResult ??
      new StreamResult({
        streamId: request.streamId,
        cameraId: request.cameraId,
        processedFrames: 0,
        droppedFrames: 0,
        currentFps: request.targetFps,
        averageLatencyMs: 0,
        lastFrameTimestamp: 0,
        status: 'STOPPED',
      })
    );
  }

  public stop(): void {
    this.isRunning = false;
  }
}
