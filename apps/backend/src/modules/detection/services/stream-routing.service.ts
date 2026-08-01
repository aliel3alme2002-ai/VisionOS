import { Injectable, Inject } from '@nestjs/common';
import { StreamProvider, STREAM_PROVIDER } from '../providers/stream-provider';
import { DetectionFrame } from '../domain/detection-frame';

@Injectable()
export class StreamRoutingService {
  constructor(
    @Inject(STREAM_PROVIDER) private readonly streamProvider: StreamProvider
  ) {}

  async fetchNextFrame(streamId: string): Promise<DetectionFrame> {
    return this.streamProvider.getFrame(streamId);
  }
}
