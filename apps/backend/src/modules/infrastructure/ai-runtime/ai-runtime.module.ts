import { Module } from '@nestjs/common';
import { AiRuntimeAdapter } from './adapter/ai-runtime.adapter';
import { RuntimeFactory } from './client/runtime-factory';
import { RuntimeClientProvider } from './client/runtime-client.provider';
import { ConnectionService } from './connection/connection.service';
import { ConfigurationService } from './configuration/configuration.service';
import { HealthService } from './health/health.service';
import { RuntimeRegistry } from './runtime/runtime-registry';
import { RuntimeManager } from './runtime/runtime-manager';
import { PreprocessingService } from './pipeline/preprocessing.service';
import { PostprocessingService } from './pipeline/postprocessing.service';
import { BatchService } from './pipeline/batch.service';
import { PipelineService } from './pipeline/pipeline.service';

@Module({
  providers: [
    AiRuntimeAdapter,
    RuntimeFactory,
    RuntimeClientProvider,
    ConnectionService,
    ConfigurationService,
    HealthService,
    RuntimeRegistry,
    RuntimeManager,
    PreprocessingService,
    PostprocessingService,
    BatchService,
    PipelineService
  ],
  exports: [
    AiRuntimeAdapter,
    RuntimeClientProvider,
    RuntimeManager,
    PipelineService,
    HealthService
  ]
})
export class AiRuntimeModule {}
