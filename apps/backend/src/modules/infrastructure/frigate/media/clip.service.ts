import { Injectable } from '@nestjs/common';
import { FrigateClientProvider } from '../client/frigate-client.provider';

@Injectable()
export class ClipService {
  constructor(private readonly clientProvider: FrigateClientProvider) {}

  async getClip(eventId: string): Promise<Buffer> {
    return this.clientProvider.getClient().fetchClip(eventId);
  }
}
