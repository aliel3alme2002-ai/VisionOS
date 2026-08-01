import { Injectable } from '@nestjs/common';
import { StreamState } from '../models/stream-state';

@Injectable()
export class StreamLifecycle {
  private readonly states: Map<string, StreamState> = new Map();
  private readonly reconnectCounts: Map<string, number> = new Map();

  public transition(streamId: string, nextState: StreamState): StreamState {
    this.states.set(streamId, nextState);
    return nextState;
  }

  public getState(streamId: string): StreamState {
    return this.states.get(streamId) ?? 'DISCONNECTED';
  }

  public incrementReconnect(streamId: string): number {
    const current = this.reconnectCounts.get(streamId) ?? 0;
    const next = current + 1;
    this.reconnectCounts.set(streamId, next);
    return next;
  }

  public resetReconnect(streamId: string): void {
    this.reconnectCounts.set(streamId, 0);
  }

  public getReconnectCount(streamId: string): number {
    return this.reconnectCounts.get(streamId) ?? 0;
  }
}
