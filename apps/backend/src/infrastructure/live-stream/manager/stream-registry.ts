import { Injectable } from '@nestjs/common';
import { StreamRequest } from '../models/stream-request';

@Injectable()
export class StreamRegistry {
  private readonly streams: Map<string, StreamRequest> = new Map();

  public registerStream(request: StreamRequest): void {
    this.streams.set(request.streamId, request);
  }

  public unregisterStream(streamId: string): boolean {
    return this.streams.delete(streamId);
  }

  public getStream(streamId: string): StreamRequest | null {
    return this.streams.get(streamId) ?? null;
  }

  public listStreams(): StreamRequest[] {
    return Array.from(this.streams.values());
  }
}
