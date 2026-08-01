import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigurationService {
  async loadConfig(deviceId: string): Promise<Record<string, unknown>> {
    return { deviceId, dhcp: true, ntp: 'pool.ntp.org' };
  }

  async saveConfig(deviceId: string, config: Record<string, unknown>): Promise<void> {
    if (!deviceId || !config) return;
  }
}
