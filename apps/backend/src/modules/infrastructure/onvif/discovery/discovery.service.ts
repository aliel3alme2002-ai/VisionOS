import { Injectable } from '@nestjs/common';
import { WsDiscoveryService } from './ws-discovery.service';
import { DeviceManager } from '../device/device-manager';
import { CameraDiscovery } from '../../../integration/models/camera-discovery';

@Injectable()
export class DiscoveryService {
  constructor(
    private readonly wsDiscovery: WsDiscoveryService,
    private readonly deviceManager: DeviceManager
  ) {}

  async discoverDevices(): Promise<CameraDiscovery[]> {
    const devices = await this.wsDiscovery.probe(3000);
    const results: CameraDiscovery[] = [];

    for (const dev of devices) {
      this.deviceManager.addDiscoveredDevice(dev);
      results.push({
        ipAddress: dev.ipAddress,
        macAddress: dev.macAddress,
        manufacturer: dev.manufacturer,
        model: dev.model,
        firmwareVersion: dev.firmwareVersion,
        discoveredAt: new Date()
      });
    }

    return results;
  }
}
