import { Injectable } from '@nestjs/common';
import { DeviceRegistry } from '../device/device-registry';
import { CameraConnection } from '../../../integration/models/camera-connection';

@Injectable()
export class ConnectionService {
  constructor(private readonly registry: DeviceRegistry) {}

  async connect(cameraId: string): Promise<CameraConnection> {
    this.registry.updateDevice(cameraId, { state: 'CONNECTED' });
    return {
      cameraId,
      ipAddress: '192.168.1.100',
      port: 80,
      protocol: 'ONVIF',
      status: 'CONNECTED',
      lastConnectedAt: new Date()
    };
  }

  async disconnect(cameraId: string): Promise<void> {
    this.registry.updateDevice(cameraId, { state: 'DISCONNECTED' });
  }

  async reconnect(cameraId: string): Promise<boolean> {
    await this.disconnect(cameraId);
    await this.connect(cameraId);
    return true;
  }
}
