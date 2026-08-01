import { Injectable } from '@nestjs/common';
import { StreamLifecycle } from './stream-lifecycle';
import { StreamState } from '../models/stream-state';

@Injectable()
export class StreamController {
  constructor(private readonly lifecycle: StreamLifecycle) {}

  public startStream(streamId: string): StreamState {
    return this.lifecycle.transition(streamId, 'CONNECTED');
  }

  public pauseStream(streamId: string): StreamState {
    return this.lifecycle.transition(streamId, 'PAUSED');
  }

  public resumeStream(streamId: string): StreamState {
    return this.lifecycle.transition(streamId, 'CONNECTED');
  }

  public stopStream(streamId: string): StreamState {
    return this.lifecycle.transition(streamId, 'STOPPED');
  }

  public triggerReconnect(streamId: string): StreamState {
    this.lifecycle.incrementReconnect(streamId);
    return this.lifecycle.transition(streamId, 'RECONNECTING');
  }
}
