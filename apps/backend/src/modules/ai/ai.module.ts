import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { ModelsController } from './controllers/models.controller';
import { DeploymentsController } from './controllers/deployments.controller';
import { PipelinesController } from './controllers/pipelines.controller';
import { RuntimeController } from './controllers/runtime.controller';
import { SchedulerController } from './controllers/scheduler.controller';
import { HealthController } from './controllers/health.controller';

import { CreateModelHandler } from './application/commands/create-model/create-model.handler';
import { UpdateModelHandler } from './application/commands/update-model/update-model.handler';
import { CreateModelVersionHandler } from './application/commands/create-model-version/create-model-version.handler';
import { CreateDeploymentHandler } from './application/commands/create-deployment/create-deployment.handler';
import { RollbackDeploymentHandler } from './application/commands/rollback-deployment/rollback-deployment.handler';
import { CreatePipelineHandler } from './application/commands/create-pipeline/create-pipeline.handler';
import { RegisterRuntimeHandler } from './application/commands/register-runtime/register-runtime.handler';
import { ScheduleJobHandler } from './application/commands/schedule-job/schedule-job.handler';

import { GetModelHandler } from './application/queries/get-model/get-model.handler';
import { ListModelsHandler } from './application/queries/list-models/list-models.handler';
import { GetDeploymentHandler } from './application/queries/get-deployment/get-deployment.handler';
import { GetPipelineHandler } from './application/queries/get-pipeline/get-pipeline.handler';
import { GetRuntimeHandler } from './application/queries/get-runtime/get-runtime.handler';
import { GetGpuDevicesHandler } from './application/queries/get-gpu-devices/get-gpu-devices.handler';

import { AiDeploymentService } from './domain/services/ai-deployment.service';
import { GpuAllocationService } from './domain/services/gpu-allocation.service';
import {
  InMemoryAiModelRepository,
  InMemoryDeploymentRepository,
  InMemoryPipelineRepository,
  InMemoryRuntimeRepository,
} from './domain/repositories/in-memory-ai.repository';

const CommandHandlers = [
  CreateModelHandler,
  UpdateModelHandler,
  CreateModelVersionHandler,
  CreateDeploymentHandler,
  RollbackDeploymentHandler,
  CreatePipelineHandler,
  RegisterRuntimeHandler,
  ScheduleJobHandler,
];

const QueryHandlers = [
  GetModelHandler,
  ListModelsHandler,
  GetDeploymentHandler,
  GetPipelineHandler,
  GetRuntimeHandler,
  GetGpuDevicesHandler,
];

@Module({
  imports: [CqrsModule],
  controllers: [
    ModelsController,
    DeploymentsController,
    PipelinesController,
    RuntimeController,
    SchedulerController,
    HealthController,
  ],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    AiDeploymentService,
    GpuAllocationService,
    InMemoryAiModelRepository,
    InMemoryDeploymentRepository,
    InMemoryPipelineRepository,
    InMemoryRuntimeRepository,
    { provide: 'IAiModelRepository', useClass: InMemoryAiModelRepository },
    { provide: 'IDeploymentRepository', useClass: InMemoryDeploymentRepository },
    { provide: 'IPipelineRepository', useClass: InMemoryPipelineRepository },
    { provide: 'IRuntimeRepository', useClass: InMemoryRuntimeRepository },
  ],
  exports: [
    AiDeploymentService,
    GpuAllocationService,
    'IAiModelRepository',
    'IDeploymentRepository',
    'IPipelineRepository',
    'IRuntimeRepository',
  ],
})
export class AiModule {}
