import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { CamerasController } from './controllers/cameras.controller';
import { CameraGroupsController } from './controllers/camera-groups.controller';
import { EdgeController } from './controllers/edge.controller';
import { OnvifController } from './controllers/onvif.controller';
import { StreamsController } from './controllers/streams.controller';
import { HealthController } from './controllers/health.controller';

import { CreateCameraHandler } from './application/commands/create-camera/create-camera.handler';
import { UpdateCameraHandler } from './application/commands/update-camera/update-camera.handler';
import { DeleteCameraHandler } from './application/commands/delete-camera/delete-camera.handler';
import { MoveCameraHandler } from './application/commands/move-camera/move-camera.handler';
import { CreateCameraGroupHandler } from './application/commands/create-camera-group/create-camera-group.handler';
import { UpdateCameraGroupHandler } from './application/commands/update-camera-group/update-camera-group.handler';
import { DeleteCameraGroupHandler } from './application/commands/delete-camera-group/delete-camera-group.handler';
import { CreateStreamProfileHandler } from './application/commands/create-stream-profile/create-stream-profile.handler';
import { RegisterEdgeNodeHandler } from './application/commands/register-edge-node/register-edge-node.handler';
import { UpdateEdgeNodeHandler } from './application/commands/update-edge-node/update-edge-node.handler';
import { EdgeHeartbeatHandler } from './application/commands/edge-heartbeat/edge-heartbeat.handler';
import { AssignDeploymentSlotHandler } from './application/commands/assign-deployment-slot/assign-deployment-slot.handler';
import { DiscoverDevicesHandler } from './application/commands/discover-devices/discover-devices.handler';
import { SyncDeviceHandler } from './application/commands/sync-device/sync-device.handler';

import { GetCameraHandler } from './application/queries/get-camera/get-camera.handler';
import { ListCamerasHandler } from './application/queries/list-cameras/list-cameras.handler';
import { GetCameraGroupHandler } from './application/queries/get-camera-group/get-camera-group.handler';
import { ListCameraGroupsHandler } from './application/queries/list-camera-groups/list-camera-groups.handler';
import { GetEdgeNodeHandler } from './application/queries/get-edge-node/get-edge-node.handler';
import { ListEdgeNodesHandler } from './application/queries/list-edge-nodes/list-edge-nodes.handler';
import { GetCameraHealthHandler } from './application/queries/get-camera-health/get-camera-health.handler';
import { GetEdgeHealthHandler } from './application/queries/get-edge-health/get-edge-health.handler';

import { VisionDiscoveryService } from './domain/services/vision-discovery.service';
import { VisionHealthService } from './domain/services/vision-health.service';
import {
  InMemoryCameraRepository,
  InMemoryCameraGroupRepository,
  InMemoryStreamProfileRepository,
  InMemoryEdgeNodeRepository,
} from './domain/repositories/in-memory-vision.repository';

const CommandHandlers = [
  CreateCameraHandler,
  UpdateCameraHandler,
  DeleteCameraHandler,
  MoveCameraHandler,
  CreateCameraGroupHandler,
  UpdateCameraGroupHandler,
  DeleteCameraGroupHandler,
  CreateStreamProfileHandler,
  RegisterEdgeNodeHandler,
  UpdateEdgeNodeHandler,
  EdgeHeartbeatHandler,
  AssignDeploymentSlotHandler,
  DiscoverDevicesHandler,
  SyncDeviceHandler,
];

const QueryHandlers = [
  GetCameraHandler,
  ListCamerasHandler,
  GetCameraGroupHandler,
  ListCameraGroupsHandler,
  GetEdgeNodeHandler,
  ListEdgeNodesHandler,
  GetCameraHealthHandler,
  GetEdgeHealthHandler,
];

@Module({
  imports: [CqrsModule],
  controllers: [
    CamerasController,
    CameraGroupsController,
    EdgeController,
    OnvifController,
    StreamsController,
    HealthController,
  ],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    VisionDiscoveryService,
    VisionHealthService,
    InMemoryCameraRepository,
    InMemoryCameraGroupRepository,
    InMemoryStreamProfileRepository,
    InMemoryEdgeNodeRepository,
    { provide: 'ICameraRepository', useClass: InMemoryCameraRepository },
    { provide: 'ICameraGroupRepository', useClass: InMemoryCameraGroupRepository },
    { provide: 'IStreamProfileRepository', useClass: InMemoryStreamProfileRepository },
    { provide: 'IEdgeNodeRepository', useClass: InMemoryEdgeNodeRepository },
  ],
  exports: [
    VisionDiscoveryService,
    VisionHealthService,
    'ICameraRepository',
    'ICameraGroupRepository',
    'IStreamProfileRepository',
    'IEdgeNodeRepository',
  ],
})
export class VisionModule {}
