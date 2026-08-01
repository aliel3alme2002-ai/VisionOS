import { InferenceRequest } from '../models/inference-request';
import { InferenceResponse } from '../models/inference-response';

export interface InferenceAdapter {
  loadModel(modelId: string): Promise<void>;
  unloadModel(modelId: string): Promise<void>;
  runInference(request: InferenceRequest): Promise<InferenceResponse>;
}
