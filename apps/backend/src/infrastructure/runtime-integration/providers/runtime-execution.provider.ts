import { Injectable } from '@nestjs/common';
import { InferenceExecutor } from '../executor/inference-executor';
import { IntegratedInferenceRequest } from '../executor/execution-pipeline';
import { IntegratedInferenceResult } from '../output/result-mapper';

export interface IRuntimeExecutionProvider {
  executeInference(request: IntegratedInferenceRequest): Promise<IntegratedInferenceResult>;
}

@Injectable()
export class RuntimeExecutionProvider implements IRuntimeExecutionProvider {
  constructor(private readonly executor: InferenceExecutor) {}

  public async executeInference(request: IntegratedInferenceRequest): Promise<IntegratedInferenceResult> {
    return this.executor.runInference(request);
  }
}
