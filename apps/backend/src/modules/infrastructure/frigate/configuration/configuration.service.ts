import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigurationService {
  async loadConfiguration(deviceId: string): Promise<Record<string, unknown>> {
    return { deviceId, detectors: { cpu: { type: 'cpu' } } };
  }

  async saveConfiguration(deviceId: string, config: Record<string, unknown>): Promise<void> {
    if (!deviceId || !config) return;
  }
}
