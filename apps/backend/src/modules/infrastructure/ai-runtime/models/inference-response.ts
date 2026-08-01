export interface LocalInferenceResponse {
  requestId: string;
  runtimeId: string;
  modelId: string;
  modelVersion: string;
  processingTime: number;
  latency: number;
  detections: Array<{
    label: string;
    confidence: number;
    box: [number, number, number, number];
  }>;
  metadata: Record<string, unknown>;
}
