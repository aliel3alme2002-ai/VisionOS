import { Injectable } from '@nestjs/common';
import { RuntimePlugin } from './runtime-plugin';
import { ExecutionRequest } from '../models/execution-request';
import { ExecutionResult } from '../models/execution-result';

@Injectable()
export class TensorRtPlugin implements RuntimePlugin {
  public readonly pluginName = 'TensorRT';
  public readonly supportedFrameworks = ['TensorRT', 'ONNX'];
  private readonly loadedModels: Set<string> = new Set();

  public async initialize(): Promise<void> {}

  public async loadModel(modelId: string, _modelPath: string): Promise<boolean> {
    this.loadedModels.add(modelId);
    return true;
  }

  public async execute(request: ExecutionRequest): Promise<ExecutionResult> {
    const startTime = Date.now();
    const latency = Date.now() - startTime + (request.batchSize > 1 ? 4 : 2);
    return new ExecutionResult({
      success: true,
      latency,
      fps: 1000 / latency,
      memoryUsage: 512,
      gpuUsage: 45,
      outputs: { detections: [], modelId: request.modelId },
    });
  }

  public async unloadModel(modelId: string): Promise<boolean> {
    return this.loadedModels.delete(modelId);
  }

  public async dispose(): Promise<void> {
    this.loadedModels.clear();
  }
}
