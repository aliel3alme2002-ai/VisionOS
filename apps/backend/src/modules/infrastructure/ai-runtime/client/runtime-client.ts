import { LocalInferenceRequest } from '../models/inference-request';
import { LocalInferenceResponse } from '../models/inference-response';

export interface RuntimeClient {
  id: string;
  engine: string;
  connect(): Promise<boolean>;
  disconnect(): Promise<void>;
  loadModel(modelId: string): Promise<void>;
  unloadModel(modelId: string): Promise<void>;
  infer(request: LocalInferenceRequest): Promise<LocalInferenceResponse>;
}
