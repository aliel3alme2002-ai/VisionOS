import { Injectable } from '@nestjs/common';
import { StreamHealth } from './stream-health';
import { StreamState } from '../models/stream-state';

@Injectable()
export class StreamMonitor {
  private readonly healthMap: Map<string, StreamHealth> = new Map();

  public updateHealth(
    streamId: string,
    cameraId: string,
    state: StreamState,
    queueDepth: number,
    droppedFrames: number,
    fps: number,
    latencyMs: number,
    reconnectAttempts = 0,
  ): StreamHealth {
    const health = new StreamHealth({
      streamId,
      cameraId,
      state,
      connected: state === 'CONNECTED',
      queueDepth,
      droppedFrames,
      currentFps: fps,
      averageLatencyMs: latencyMs,
      reconnectAttempts,
      timestamp: new Date(),
    });

    this.healthMap.set(streamId, health);
    return health;
  }

  public getHealth(streamId: string): StreamHealth | null {
    return this.healthMap.get(streamId) ?? null;
  }

  public listAllHealth(): StreamHealth[] {
    return Array.from(this.healthMap.values());
  }
}
