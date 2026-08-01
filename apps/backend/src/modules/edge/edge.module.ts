import { Module } from '@nestjs/common';
import { EdgeManagementService } from './services/edge-management.service';
import { EdgeHealthService } from './services/edge-health.service';
import { EdgeAssignmentService } from './services/edge-assignment.service';
import { ResourceAllocationService } from './services/resource-allocation.service';

import { EDGE_REPOSITORY } from './repositories/edge.repository';
import { DEPLOYMENT_REPOSITORY } from './repositories/deployment.repository';

import { EDGE_RUNTIME_PROVIDER } from './providers/edge-runtime.provider';
import { DEPLOYMENT_PROVIDER } from './providers/deployment.provider';
import { RESOURCE_MONITOR_PROVIDER } from './providers/resource-monitor.provider';

// Dummy implementation for compilation
const dummyRepository = {
  findById: async () => null,
  findByOrganization: async () => [],
  findByEdge: async () => [],
  findByCamera: async () => [],
  saveNode: async () => {},
  deleteNode: async () => {},
  saveResource: async () => {},
  getResource: async () => null,
  saveCapabilities: async () => {},
  getCapabilities: async () => null,
  save: async () => {},
  delete: async () => {},
};

const dummyProvider = {
  ping: async () => true,
  restart: async () => true,
  updateVersion: async () => true,
  deploy: async () => true,
  remove: async () => true,
  getStatus: async () => 'ACTIVE',
  fetchMetrics: async () => ({
    edgeId: 'dummy',
    cpuCores: 4,
    cpuUsage: 50,
    memoryTotal: 16000,
    memoryUsed: 8000,
    gpuCount: 1,
    gpuMemory: 8000,
    gpuUsage: 50,
    diskTotal: 256000,
    diskUsed: 128000,
    temperature: 45
  })
};

@Module({
  providers: [
    EdgeManagementService,
    EdgeHealthService,
    EdgeAssignmentService,
    ResourceAllocationService,
    
    // Dummy providers for DI to compile without infrastructure
    { provide: EDGE_REPOSITORY, useValue: dummyRepository },
    { provide: DEPLOYMENT_REPOSITORY, useValue: dummyRepository },
    
    { provide: EDGE_RUNTIME_PROVIDER, useValue: dummyProvider },
    { provide: DEPLOYMENT_PROVIDER, useValue: dummyProvider },
    { provide: RESOURCE_MONITOR_PROVIDER, useValue: dummyProvider }
  ],
  exports: [
    EdgeManagementService,
    EdgeHealthService,
    EdgeAssignmentService,
    ResourceAllocationService
  ],
})
export class EdgeModule {}
