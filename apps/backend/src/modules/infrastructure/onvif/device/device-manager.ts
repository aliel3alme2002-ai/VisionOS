import { Injectable } from '@nestjs/common';
import { DeviceRegistry } from './device-registry';
import { OnvifDevice } from '../models/onvif-device';

@Injectable()
export class DeviceManager {
  constructor(private readonly registry: DeviceRegistry) {}

  addDiscoveredDevice(device: OnvifDevice): void {
    const existing = this.registry.findByIpOrMac(device.ipAddress, device.macAddress);
    if (!existing) {
      this.registry.registerDevice(device);
    } else {
      this.registry.updateDevice(existing.id, { lastSeen: new Date(), state: device.state });
    }
  }
}
