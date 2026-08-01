import { Injectable } from '@nestjs/common';
import { FrigateClient } from './frigate-client';

@Injectable()
export class FrigateClientProvider {
  getClient(): FrigateClient {
    return {
      connect: async () => true,
      disconnect: async () => {},
      subscribeEvents: async () => {},
      fetchSnapshot: async () => Buffer.from([]),
      fetchClip: async () => Buffer.from([])
    };
  }
}
