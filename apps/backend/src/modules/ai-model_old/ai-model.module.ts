import { Module } from '@nestjs/common';
import { ModelManagementService } from './services/model-management.service';
import { ModelVersionService } from './services/model-version.service';
import { ModelDeploymentService } from './services/model-deployment.service';
import { ModelValidationService } from './services/model-validation.service';

import { AI_MODEL_REPOSITORY } from './repositories/ai-model.repository';
import { MODEL_DEPLOYMENT_REPOSITORY } from './repositories/model-deployment.repository';

import { MODEL_RUNTIME_PROVIDER } from './providers/model-runtime.provider';
import { MODEL_VALIDATOR_PROVIDER } from './providers/model-validator.provider';
import { MODEL_REGISTRY_PROVIDER } from './providers/model-registry.provider';

// Dummy implementation for compilation
const dummyRepository = {
  findById: async () => null,
  findByOrganization: async () => [],
  findByEdge: async () => [],
  save: async () => {},
  delete: async () => {},
  saveVersion: async () => {},
  getVersion: async () => null,
};

const dummyProvider = {
  configureRuntime: async () => true,
  stopRuntime: async () => true,
  validateChecksum: async () => true,
  validateShape: async () => true,
  downloadModel: async () => 'path/to/model',
  uploadModel: async () => 'version_id',
};

@Module({
  providers: [
    ModelManagementService,
    ModelVersionService,
    ModelDeploymentService,
    ModelValidationService,
    
    // Dummy providers for DI to compile without infrastructure
    { provide: AI_MODEL_REPOSITORY, useValue: dummyRepository },
    { provide: MODEL_DEPLOYMENT_REPOSITORY, useValue: dummyRepository },
    
    { provide: MODEL_RUNTIME_PROVIDER, useValue: dummyProvider },
    { provide: MODEL_VALIDATOR_PROVIDER, useValue: dummyProvider },
    { provide: MODEL_REGISTRY_PROVIDER, useValue: dummyProvider }
  ],
  exports: [
    ModelManagementService,
    ModelVersionService,
    ModelDeploymentService,
    ModelValidationService
  ],
})
export class AIModelModule {}
