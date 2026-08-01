import { Module } from '@nestjs/common';
import { OnvifAdapter } from './adapter/onvif.adapter';
import { OnvifClientProvider } from './client/onvif-client.provider';
import { DeviceRegistry } from './device/device-registry';
import { DeviceManager } from './device/device-manager';
import { WsDiscoveryService } from './discovery/ws-discovery.service';
import { DiscoveryService } from './discovery/discovery.service';
import { PresetService } from './ptz/preset.service';
import { PtzService } from './ptz/ptz.service';
import { SnapshotService } from './snapshot/snapshot.service';
import { ConfigurationService } from './configuration/configuration.service';
import { CapabilityService } from './capabilities/capability.service';
import { HealthService } from './health/health.service';
import { ConnectionService } from './connection/connection.service';

@Module({
  providers: [
    OnvifAdapter,
    OnvifClientProvider,
    DeviceRegistry,
    DeviceManager,
    WsDiscoveryService,
    DiscoveryService,
    PresetService,
    PtzService,
    SnapshotService,
    ConfigurationService,
    CapabilityService,
    HealthService,
    ConnectionService
  ],
  exports: [
    OnvifAdapter,
    DeviceRegistry,
    DiscoveryService,
    HealthService
  ]
})
export class OnvifModule {}
