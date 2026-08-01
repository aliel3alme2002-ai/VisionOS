import { Injectable, Inject } from '@nestjs/common';
import { CameraDiscoveryProvider, CAMERA_DISCOVERY_PROVIDER } from '../providers/camera-discovery.provider';

@Injectable()
export class CameraDiscoveryService {
  constructor(
    @Inject(CAMERA_DISCOVERY_PROVIDER) private readonly discoveryProvider: CameraDiscoveryProvider
  ) {}

  async discover(subnet: string): Promise<any[]> {
    return this.discoveryProvider.discoverCameras(subnet);
  }
}
