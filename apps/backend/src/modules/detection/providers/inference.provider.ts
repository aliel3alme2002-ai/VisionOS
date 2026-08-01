import { InferenceRequest } from '../domain/inference-request';
import { InferenceResult } from '../domain/inference-result';

export interface InferenceProvider {
  runInference(request: InferenceRequest): Promise<InferenceResult>;
  batchInference(requests: InferenceRequest[]): Promise<InferenceResult[]>;
}

export const INFERENCE_PROVIDER = Symbol('INFERENCE_PROVIDER');
