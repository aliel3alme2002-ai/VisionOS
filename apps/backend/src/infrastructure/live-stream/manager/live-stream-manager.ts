import { Injectable } from '@nestjs/common';
import { StreamRegistry } from './stream-registry';
import { LiveStreamSession } from './stream-session';
import { StreamController } from '../control/stream-controller';
import { StreamRequest } from '../models/stream-request';
import { WorkerPool } from '../worker/worker-pool';
import { StreamWorker } from '../worker/stream-worker';
import { StreamPipeline } from '../pipeline/stream-pipeline';
import { StreamResult } from '../models/stream-result';

@Injectable()
export class LiveStreamManager {
  private readonly sessions: Map<string, LiveStreamSession> = new Map();

  constructor(
    private readonly registry: StreamRegistry,
    private readonly controller: StreamController,
    private readonly workerPool: WorkerPool,
    private readonly pipeline: StreamPipeline,
  ) {}

  public async startLiveStream(request: StreamRequest): Promise<LiveStreamSession | null> {
    this.registry.registerStream(request);

    const session = new LiveStreamSession({
      sessionId: `sess-${request.streamId}`,
      streamId: request.streamId,
      cameraId: request.cameraId,
      rtspUrl: request.rtspUrl,
      state: 'CONNECTED',
      createdAt: new Date(),
    });

    const worker = new StreamWorker(this.pipeline);
    const acquired = this.workerPool.acquireWorker(request.streamId, worker);
    if (!acquired) {
      session.state = 'ERROR';
      return session;
    }

    this.controller.startStream(request.streamId);
    this.sessions.set(request.streamId, session);
    return session;
  }

  public async processStreamTick(streamId: string, frameIndex: number): Promise<StreamResult | null> {
    const request = this.registry.getStream(streamId);
    if (!request) return null;
    return this.pipeline.processStreamTick(request, frameIndex);
  }

  public async stopLiveStream(streamId: string): Promise<boolean> {
    const session = this.sessions.get(streamId);
    if (!session) return false;

    this.controller.stopStream(streamId);
    this.workerPool.releaseWorker(streamId);
    this.registry.unregisterStream(streamId);
    this.sessions.delete(streamId);
    return true;
  }

  public getSession(streamId: string): LiveStreamSession | null {
    return this.sessions.get(streamId) ?? null;
  }
}
