import { Injectable } from '@nestjs/common';
import { ImageDecoder } from '../image/image-decoder';
import { ImageResizer } from '../image/image-resizer';
import { ImageNormalizer } from '../image/image-normalizer';
import { TensorBuilder } from '../tensor/tensor-builder';
import { TaskExecutor, TaskResult, TaskType } from './task-executor';
import { ExecutionEngine } from '../../runtime/execution/execution-engine';
import { ExecutionRequest } from '../../runtime/models/execution-request';

export interface RealInferenceOptions {
  imageInput: Buffer | string;
  modelId: string;
  taskType: TaskType;
  runtime: string;
  organizationId?: string | undefined;
}

@Injectable()
export class RuntimeExecutor {
  constructor(
    private readonly decoder: ImageDecoder,
    private readonly resizer: ImageResizer,
    private readonly normalizer: ImageNormalizer,
    private readonly tensorBuilder: TensorBuilder,
    private readonly executionEngine: ExecutionEngine,
    private readonly taskExecutor: TaskExecutor,
  ) {}

  public async executeRealInference(options: RealInferenceOptions): Promise<TaskResult> {
    const startTime = Date.now();

    // 1. Decode Image from Disk / Buffer
    const image = typeof options.imageInput === 'string'
      ? await this.decoder.decodeFromDisk(options.imageInput)
      : await this.decoder.decodeBuffer(options.imageInput);

    // 2. Resize & Letterbox
    const letterbox = this.resizer.resizeWithLetterbox(image, 640, 640);

    // 3. Normalize to [0, 1]
    const floatPixels = this.normalizer.normalizeToFloat32(letterbox.paddedImage);

    // 4. Build NCHW Batch Tensor
    const tensor = this.tensorBuilder.buildBatchTensor(floatPixels, 640, 640);

    // 5. Execute Engine
    const request = new ExecutionRequest({
      modelId: options.modelId,
      version: '1.0.0',
      runtime: options.runtime,
      input: { tensorData: tensor.data, shape: tensor.shape },
      batchSize: 1,
      priority: 1,
      timeout: 5000,
      organizationId: options.organizationId ?? 'default-org',
    });

    const execRes = await this.executionEngine.processInference(request);
    const executionTimeMs = Date.now() - startTime;

    // 6. Decode Output to TaskResult
    return this.taskExecutor.decodeTaskResult(options.taskType, execRes.outputs, options.modelId, executionTimeMs);
  }
}
