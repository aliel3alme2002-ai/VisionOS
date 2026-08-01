export interface StreamSession {
  sessionId: string;
  cameraId: string;
  streamUrl: string;
  resolution: string;
  fps: number;
  startedAt: Date;
}
