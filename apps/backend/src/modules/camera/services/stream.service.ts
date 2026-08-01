import { Injectable, Inject } from '@nestjs/common';
import { StreamProfile } from '../domain/stream-profile';
import { StreamProvider, STREAM_PROVIDER } from '../providers/stream.provider';

@Injectable()
export class StreamService {
  constructor(
    @Inject(STREAM_PROVIDER) private readonly streamProvider: StreamProvider
  ) {}

  async startStream(profile: StreamProfile): Promise<string> {
    return this.streamProvider.openStream(profile);
  }

  async stopStream(profileId: string): Promise<boolean> {
    return this.streamProvider.closeStream(profileId);
  }
}
