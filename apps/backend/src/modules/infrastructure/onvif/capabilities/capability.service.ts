import { Injectable } from '@nestjs/common';
import { OnvifCapabilities } from '../models/onvif-capabilities';

@Injectable()
export class CapabilityService {
  async getCapabilities(deviceId: string): Promise<OnvifCapabilities> {
    return {
      deviceId,
      capabilities: [
        { id: 'cap_ptz', name: 'PTZ Control', category: 'PTZ', version: '20.12', enabled: true },
        { id: 'cap_snap', name: 'Snapshot Capture', category: 'Snapshot', version: '2.0', enabled: true }
      ]
    };
  }
}
