export interface CameraHealth {
  cameraId: string;
  online: boolean;
  latency: number;
  packetLoss: number;
  bitrate: number;
  fps: number;
  lastSeen: Date;
}
