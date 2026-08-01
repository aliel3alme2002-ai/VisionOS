import { CameraConnection } from '../models/camera-connection';

export interface CameraAdapter {
  connect(cameraId: string): Promise<CameraConnection>;
  disconnect(cameraId: string): Promise<void>;
  getStatus(cameraId: string): Promise<string>;
}
