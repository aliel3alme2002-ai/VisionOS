import { Injectable } from '@nestjs/common';
import { FrigateClientProvider } from '../client/frigate-client.provider';

@Injectable()
export class SnapshotService {
  constructor(private readonly clientProvider: FrigateClientProvider) {}

  async getSnapshot(eventId: string): Promise<Buffer> {
    return this.clientProvider.getClient().fetchSnapshot(eventId);
  }
}
