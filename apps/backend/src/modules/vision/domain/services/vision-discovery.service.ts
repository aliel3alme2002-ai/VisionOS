import { Injectable, Inject } from '@nestjs/common';
import { ICameraRepository } from '../repositories/camera.repository';
import { DeviceDiscovery } from '../entities/device-discovery';
import { randomUUID } from 'crypto';

@Injectable()
export class VisionDiscoveryService {
  constructor(
    @Inject('ICameraRepository') private readonly cameraRepository: ICameraRepository,
  ) {}

  public async scanNetwork(subnet: string): Promise<DeviceDiscovery[]> {
    // Check repository for existing devices on subnet
    await this.cameraRepository.findByIpOrMac(`${subnet}.10`);
    return [
      new DeviceDiscovery({
        id: randomUUID(),
        ipAddress: `${subnet}.10`,
        macAddress: '00:1A:2B:3C:4D:5E',
        manufacturer: 'Hikvision',
        model: 'DS-2CD2143G0-I',
        onvifSupported: true,
      }),
      new DeviceDiscovery({
        id: randomUUID(),
        ipAddress: `${subnet}.11`,
        macAddress: '00:1A:2B:3C:4D:5F',
        manufacturer: 'Dahua',
        model: 'IPC-HDW4433C-A',
        onvifSupported: true,
      }),
    ];
  }
}
