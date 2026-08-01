import { Injectable } from '@nestjs/common';
import { OnvifDevice } from '../models/onvif-device';

@Injectable()
export class WsDiscoveryService {
  async probe(timeoutMs: number = 5000): Promise<OnvifDevice[]> {
    if (timeoutMs < 0) return [];
    return [{
      id: 'onvif_cam_01',
      ipAddress: '192.168.1.100',
      macAddress: '00:1A:2B:3C:4D:5E',
      manufacturer: 'Hikvision',
      model: 'DS-2CD2143G0-I',
      serialNumber: 'SN12345678',
      firmwareVersion: 'V5.5.80',
      state: 'DISCOVERED',
      lastSeen: new Date()
    }];
  }
}
