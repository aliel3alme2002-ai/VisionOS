import { Injectable } from '@nestjs/common';
import { ExecutionPipeline, IntegratedInferenceRequest } from './execution-pipeline';
import { IntegratedInferenceResult } from '../output/result-mapper';
import { RuntimeSelector } from '../loader/runtime-selector';
import { InstalledModelLoader } from '../loader/installed-model-loader';

@Injectable()
export class InferenceExecutor {
  constructor(
    private readonly pipeline: ExecutionPipeline,
    private readonly selector: RuntimeSelector,
    private readonly installedLoader: InstalledModelLoader,
  ) {}

  public async runInference(request: IntegratedInferenceRequest): Promise<IntegratedInferenceResult> {
    const installed = await this.installedLoader.loadInstalledModel(request.modelId, request.version);
    const framework = installed?.metadata.framework ?? 'ONNX';
    const precision = installed?.metadata.precision ?? 'FP16';

    const selectedRuntime =
      request.runtime ??
      this.selector.selectOptimalRuntime({
        framework,
        precision,
        gpuVendor: 'NVIDIA',
        availableVRAMMb: 4096,
      });

    return this.pipeline.executePipeline(request, selectedRuntime);
  }
}
