import { Injectable } from '@nestjs/common';
import { OnvifDevice } from '../models/onvif-device';

@Injectable()
export class DeviceRegistry {
  private devices: Map<string, OnvifDevice> = new Map();

  registerDevice(device: OnvifDevice): void {
    this.devices.set(device.id, device);
  }

  updateDevice(id: string, partial: Partial<OnvifDevice>): void {
    const existing = this.devices.get(id);
    if (existing) {
      this.devices.set(id, { ...existing, ...partial });
    }
  }

  removeDevice(id: string): void {
    this.devices.delete(id);
  }

  lookupDevice(id: string): OnvifDevice | undefined {
    return this.devices.get(id);
  }

  findByIpOrMac(ipAddress: string, macAddress: string): OnvifDevice | undefined {
    for (const dev of this.devices.values()) {
      if (dev.ipAddress === ipAddress || (macAddress && dev.macAddress === macAddress)) {
        return dev;
      }
    }
    return undefined;
  }

  getAllDevices(): OnvifDevice[] {
    return Array.from(this.devices.values());
  }
}
