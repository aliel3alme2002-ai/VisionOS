import { Module } from '@nestjs/common';
import { CameraManagementService } from './services/camera-management.service';
import { CameraHealthService } from './services/camera-health.service';
import { CameraDiscoveryService } from './services/camera-discovery.service';
import { StreamService } from './services/stream.service';
import { SnapshotService } from './services/snapshot.service';

import { CAMERA_CONFIGURATION_REPOSITORY } from './repositories/camera-configuration.repository';
import { CAMERA_HEALTH_REPOSITORY } from './repositories/camera-health.repository';

import { CAMERA_DISCOVERY_PROVIDER } from './providers/camera-discovery.provider';
import { STREAM_PROVIDER } from './providers/stream.provider';
import { SNAPSHOT_PROVIDER } from './providers/snapshot.provider';
import { PTZ_PROVIDER } from './providers/ptz.provider';

// Dummy implementation for compilation
const dummyRepository = {
  findById: async () => null,
  findByOrganization: async () => [],
  findByCamera: async () => null,
  save: async () => {},
  delete: async () => {}
};

const dummyProvider = {
  discoverCameras: async () => [],
  openStream: async () => 'stream_id',
  closeStream: async () => true,
  takeSnapshot: async () => 'snapshot_url',
  move: async () => true,
  stop: async () => true,
};

@Module({
  providers: [
    CameraManagementService,
    CameraHealthService,
    CameraDiscoveryService,
    StreamService,
    SnapshotService,
    
    // Dummy providers for DI to compile without infrastructure
    { provide: CAMERA_CONFIGURATION_REPOSITORY, useValue: dummyRepository },
    { provide: CAMERA_HEALTH_REPOSITORY, useValue: dummyRepository },
    
    { provide: CAMERA_DISCOVERY_PROVIDER, useValue: dummyProvider },
    { provide: STREAM_PROVIDER, useValue: dummyProvider },
    { provide: SNAPSHOT_PROVIDER, useValue: dummyProvider },
    { provide: PTZ_PROVIDER, useValue: dummyProvider }
  ],
  exports: [
    CameraManagementService,
    CameraHealthService,
    CameraDiscoveryService,
    StreamService,
    SnapshotService
  ],
})
export class CameraModule {}
