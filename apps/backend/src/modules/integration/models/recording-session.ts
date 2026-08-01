export interface RecordingSession {
  sessionId: string;
  cameraId: string;
  storagePath: string;
  status: string;
  startedAt: Date;
  pausedAt?: Date;
}
