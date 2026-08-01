import { Injectable } from '@nestjs/common';
import { CameraAdapter } from '../../../integration/contracts/camera.adapter';
import { PtzAdapter } from '../../../integration/contracts/ptz.adapter';
import { SnapshotAdapter } from '../../../integration/contracts/snapshot.adapter';
import { DiscoveryAdapter } from '../../../integration/contracts/discovery.adapter';
import { CapabilityAdapter } from '../../../integration/contracts/capability.adapter';
import { ConfigurationAdapter } from '../../../integration/contracts/configuration.adapter';
import { HealthAdapter } from '../../../integration/contracts/health.adapter';
import { ConnectionAdapter } from '../../../integration/contracts/connection.adapter';

import { SnapshotResult } from '../../../integration/models/snapshot-result';
import { CameraDiscovery } from '../../../integration/models/camera-discovery';
import { CameraCapabilities } from '../../../integration/models/camera-capabilities';
import { AdapterHealth } from '../../../integration/models/adapter-health';
import { PtzCommand } from '../../../integration/models/ptz-command';

import { ConnectionService } from '../connection/connection.service';
import { PtzService } from '../ptz/ptz.service';
import { SnapshotService } from '../snapshot/snapshot.service';
import { DiscoveryService } from '../discovery/discovery.service';
import { CapabilityService } from '../capabilities/capability.service';
import { ConfigurationService } from '../configuration/configuration.service';
import { HealthService } from '../health/health.service';
import { DeviceRegistry } from '../device/device-registry';

@Injectable()
export class OnvifAdapter implements 
  CameraAdapter, 
  PtzAdapter, 
  SnapshotAdapter, 
  DiscoveryAdapter, 
  CapabilityAdapter, 
  ConfigurationAdapter, 
  HealthAdapter, 
  ConnectionAdapter {

  constructor(
    private readonly connectionService: ConnectionService,
    private readonly ptzService: PtzService,
    private readonly snapshotService: SnapshotService,
    private readonly discoveryService: DiscoveryService,
    private readonly capabilityService: CapabilityService,
    private readonly configurationService: ConfigurationService,
    private readonly healthService: HealthService,
    private readonly registry: DeviceRegistry
  ) {}

  async connect(target: string): Promise<any> {
    return this.connectionService.connect(target);
  }

  async disconnect(target: string): Promise<void> {
    await this.connectionService.disconnect(target);
  }

  async reconnect(target: string): Promise<boolean> {
    return this.connectionService.reconnect(target);
  }

  async getStatus(cameraId: string): Promise<string> {
    const dev = this.registry.lookupDevice(cameraId);
    return dev ? dev.state : 'UNKNOWN';
  }

  async move(command: PtzCommand): Promise<void> {
    await this.ptzService.move(command);
  }

  async stop(cameraId: string): Promise<void> {
    await this.ptzService.stop(cameraId);
  }

  async gotoPreset(cameraId: string, presetId: string): Promise<void> {
    await this.ptzService.gotoPreset(cameraId, presetId);
  }

  async listPresets(cameraId: string): Promise<string[]> {
    return this.ptzService.listPresets(cameraId);
  }

  async captureSnapshot(cameraId: string): Promise<SnapshotResult> {
    return this.snapshotService.capture(cameraId);
  }

  async discover(networkCidr?: string): Promise<CameraDiscovery[]> {
    if (networkCidr) {
      // Filter if needed
    }
    return this.discoveryService.discoverDevices();
  }

  async getCapabilities(cameraId: string): Promise<CameraCapabilities> {
    const onvifCaps = await this.capabilityService.getCapabilities(cameraId);
    return {
      cameraId,
      supportsPtz: onvifCaps.capabilities.some(c => c.category === 'PTZ' && c.enabled),
      supportsAudio: onvifCaps.capabilities.some(c => c.category === 'Audio' && c.enabled),
      maxResolution: '3840x2160',
      supportedCodecs: ['H.264', 'H.265']
    };
  }

  async loadConfiguration(deviceId: string): Promise<Record<string, unknown>> {
    return this.configurationService.loadConfig(deviceId);
  }

  async saveConfiguration(deviceId: string, config: Record<string, unknown>): Promise<void> {
    await this.configurationService.saveConfig(deviceId, config);
  }

  async health(): Promise<AdapterHealth> {
    return this.healthService.checkHealth();
  }

  async ping(): Promise<boolean> {
    return this.healthService.ping();
  }
}
