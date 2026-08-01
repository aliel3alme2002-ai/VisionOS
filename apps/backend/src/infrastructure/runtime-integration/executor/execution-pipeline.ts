import { Injectable } from '@nestjs/common';
import { ImageLoader } from '../input/image-loader';
import { TensorPreprocessor } from '../input/tensor-preprocessor';
import { TensorPostprocessor } from '../output/tensor-postprocessor';
import { IntegratedInferenceResult } from '../output/result-mapper';
import { RuntimeManager } from '../../runtime/manager/runtime-manager';
import { ExecutionRequest } from '../../runtime/models/execution-request';

export interface IntegratedInferenceRequest {
  image: Buffer | string;
  modelId: string;
  version?: string | undefined;
  runtime?: string | undefined;
  confidence?: number | undefined;
  iou?: number | undefined;
  batchSize?: number | undefined;
  device?: string | undefined;
  organizationId?: string | undefined;
}

@Injectable()
export class ExecutionPipeline {
  constructor(
    private readonly imageLoader: ImageLoader,
    private readonly preprocessor: TensorPreprocessor,
    private readonly postprocessor: TensorPostprocessor,
    private readonly runtimeManager: RuntimeManager,
  ) {}

  public async executePipeline(request: IntegratedInferenceRequest, selectedRuntime: string): Promise<IntegratedInferenceResult> {
    const startTime = Date.now();

    // 1. Image Load
    const image = await this.imageLoader.loadImage(request.image);

    // 2. Preprocess
    const tensor = this.preprocessor.preprocess(image);

    // 3. Inference Execution
    const execReq = new ExecutionRequest({
      modelId: request.modelId,
      version: request.version ?? '1.0.0',
      runtime: selectedRuntime,
      input: { tensorData: tensor.data, shape: tensor.shape },
      batchSize: request.batchSize ?? 1,
      priority: 1,
      timeout: 5000,
      organizationId: request.organizationId ?? 'default-org',
    });

    const execRes = await this.runtimeManager.execute(execReq);
    const executionTimeMs = Date.now() - startTime;

    // 4. Postprocess & Map
    return this.postprocessor.postprocess(
      execRes.outputs,
      request.confidence ?? 0.25,
      request.iou ?? 0.45,
      request.modelId,
      selectedRuntime,
      executionTimeMs,
    );
  }
}
