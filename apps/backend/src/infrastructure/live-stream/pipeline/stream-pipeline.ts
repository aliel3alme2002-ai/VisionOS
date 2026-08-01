import { Injectable } from '@nestjs/common';
import { FrameExtractor } from '../../video/frame/frame-extractor';
import { LiveFrameQueue } from '../queue/frame-queue';
import { FrameDispatcher } from './frame-dispatcher';
import { StreamRequest } from '../models/stream-request';
import { StreamResult } from '../models/stream-result';

@Injectable()
export class StreamPipeline {
  constructor(
    private readonly frameExtractor: FrameExtractor,
    private readonly queue: LiveFrameQueue,
    private readonly dispatcher: FrameDispatcher,
  ) {}

  public async processStreamTick(request: StreamRequest, frameIndex: number): Promise<StreamResult> {
    const ptsMs = frameIndex * (1000 / request.targetFps);
    const frame = this.frameExtractor.extractFrame(request.cameraId, frameIndex, ptsMs);

    this.queue.enqueue(frame);
    const queuedFrame = this.queue.dequeue();

    if (queuedFrame) {
      await this.dispatcher.dispatchFrame(queuedFrame, request.modelId);
    }

    return new StreamResult({
      streamId: request.streamId,
      cameraId: request.cameraId,
      processedFrames: frameIndex + 1,
      droppedFrames: this.queue.getOverflowCount(),
      currentFps: request.targetFps,
      averageLatencyMs: 12,
      lastFrameTimestamp: ptsMs,
      status: 'CONNECTED',
    });
  }
}
