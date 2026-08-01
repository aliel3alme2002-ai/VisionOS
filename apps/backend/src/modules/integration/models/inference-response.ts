export interface InferenceResponse {
  requestId: string;
  modelId: string;
  detections: Array<{
    label: string;
    confidence: number;
    boundingBox: { x: number; y: number; w: number; h: number };
  }>;
  latencyMs: number;
}
