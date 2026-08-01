import { Injectable } from '@nestjs/common';
import { StorageClientProvider } from '../provider/storage-client.provider';
import { AdapterHealth } from '../../../integration/models/adapter-health';

@Injectable()
export class HealthService {
  constructor(private readonly clientProvider: StorageClientProvider) {}

  async checkHealth(): Promise<AdapterHealth> {
    const health = await this.clientProvider.getProvider().getHealth();
    return {
      adapterId: 'storage-adapter-01',
      status: health.available ? 'UP' : 'DOWN',
      latencyMs: health.latencyMs,
      lastCheckedAt: new Date(),
      details: {
        freeSpaceBytes: health.freeSpaceBytes,
        totalSpaceBytes: health.totalSpaceBytes
      }
    };
  }

  async ping(): Promise<boolean> {
    return true;
  }
}
