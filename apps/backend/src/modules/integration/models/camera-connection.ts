export interface CameraConnection {
  cameraId: string;
  ipAddress: string;
  port: number;
  protocol: string;
  status: string;
  lastConnectedAt?: Date;
}
