export interface LocalInferenceRequest {
  requestId: string;
  pipelineId: string;
  cameraId: string;
  frameId: string;
  timestamp: number;
  image: Buffer;
  metadata: Record<string, unknown>;
}
