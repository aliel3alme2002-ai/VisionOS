import { Module } from '@nestjs/common';
import { CameraDomainService } from './services/camera-domain.service';
import { EdgeAssignmentService } from './services/edge-assignment.service';
import { ModelAssignmentService } from './services/model-assignment.service';
import { ZoneService } from './services/zone.service';
import { RuleService } from './services/rule.service';

import { CAMERA_REPOSITORY } from './repositories/camera.repository';
import { EDGE_REPOSITORY } from './repositories/edge.repository';
import { AI_MODEL_REPOSITORY } from './repositories/ai-model.repository';
import { ZONE_REPOSITORY } from './repositories/zone.repository';
import { RULE_REPOSITORY } from './repositories/rule.repository';

import { CAMERA_PROVIDER } from './providers/camera.provider';
import { AI_PROVIDER } from './providers/ai.provider';

// Dummy implementation for compilation
const dummyRepository = {
  findById: async () => null,
  findByOrganization: async () => [],
  findByCamera: async () => [],
  findAll: async () => [],
  save: async () => {},
  delete: async () => {}
};

const dummyCameraProvider = {
  connect: async () => true,
  disconnect: async () => true,
  getCapabilities: async () => ({}),
  reboot: async () => true
};

const dummyAIProvider = {
  deployModel: async () => true,
  removeModel: async () => true,
  getModelStatus: async () => 'ACTIVE'
};

@Module({
  providers: [
    CameraDomainService,
    EdgeAssignmentService,
    ModelAssignmentService,
    ZoneService,
    RuleService,
    
    // Dummy providers for DI to compile
    { provide: CAMERA_REPOSITORY, useValue: dummyRepository },
    { provide: EDGE_REPOSITORY, useValue: dummyRepository },
    { provide: AI_MODEL_REPOSITORY, useValue: dummyRepository },
    { provide: ZONE_REPOSITORY, useValue: dummyRepository },
    { provide: RULE_REPOSITORY, useValue: dummyRepository },
    
    { provide: CAMERA_PROVIDER, useValue: dummyCameraProvider },
    { provide: AI_PROVIDER, useValue: dummyAIProvider }
  ],
  exports: [
    CameraDomainService,
    EdgeAssignmentService,
    ModelAssignmentService,
    ZoneService,
    RuleService
  ],
})
export class VisionModule {}
