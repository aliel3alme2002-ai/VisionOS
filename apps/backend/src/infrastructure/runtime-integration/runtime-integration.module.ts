import { Module } from '@nestjs/common';
import { ImageLoader } from './input/image-loader';
import { TensorPreprocessor } from './input/tensor-preprocessor';
import { TensorPostprocessor } from './output/tensor-postprocessor';
import { RuntimeSelector } from './loader/runtime-selector';
import { InstalledModelLoader } from './loader/installed-model-loader';
import { ExecutionPipeline } from './executor/execution-pipeline';
import { InferenceExecutor } from './executor/inference-executor';
import { ModelWarmupService } from './warmup/model-warmup.service';
import { RuntimeProfilerService } from './benchmark/runtime-profiler.service';
import { RuntimeBenchmarkService } from './benchmark/runtime-benchmark.service';
import { RuntimeExecutionProvider } from './providers/runtime-execution.provider';
import { ModelZooModule } from '../model-zoo/model-zoo.module';
import { RuntimeModule } from '../runtime/runtime.module';
import { ModelInstallerModule } from '../model-installer/model-installer.module';

@Module({
  imports: [ModelZooModule, RuntimeModule, ModelInstallerModule],
  providers: [
    ImageLoader,
    TensorPreprocessor,
    TensorPostprocessor,
    RuntimeSelector,
    InstalledModelLoader,
    ExecutionPipeline,
    InferenceExecutor,
    ModelWarmupService,
    RuntimeProfilerService,
    RuntimeBenchmarkService,
    RuntimeExecutionProvider,
  ],
  exports: [
    InferenceExecutor,
    RuntimeSelector,
    ModelWarmupService,
    RuntimeBenchmarkService,
    RuntimeExecutionProvider,
  ],
})
export class RuntimeIntegrationModule {}
