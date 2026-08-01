import { Injectable } from '@nestjs/common';
import { AdapterHealth } from '../../../integration/models/adapter-health';

@Injectable()
export class HealthService {
  async checkHealth(): Promise<AdapterHealth> {
    return {
      adapterId: 'frigate-adapter-01',
      status: 'UP',
      latencyMs: 10,
      lastCheckedAt: new Date()
    };
  }

  async ping(): Promise<boolean> {
    return true;
  }
}
