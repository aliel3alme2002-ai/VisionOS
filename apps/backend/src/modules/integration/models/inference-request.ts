export interface InferenceRequest {
  requestId: string;
  modelId: string;
  imageUrl: string;
  parameters?: Record<string, unknown>;
}
