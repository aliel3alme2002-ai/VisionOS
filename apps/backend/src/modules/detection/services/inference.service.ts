import { Injectable, Inject } from '@nestjs/common';
import { InferenceProvider, INFERENCE_PROVIDER } from '../providers/inference.provider';
import { InferenceRequest } from '../domain/inference-request';
import { InferenceResult } from '../domain/inference-result';

@Injectable()
export class InferenceService {
  constructor(
    @Inject(INFERENCE_PROVIDER) private readonly inferenceProvider: InferenceProvider
  ) {}

  async processFrame(request: InferenceRequest): Promise<InferenceResult> {
    return this.inferenceProvider.runInference(request);
  }
}
