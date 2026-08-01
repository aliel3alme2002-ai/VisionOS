import { CameraCapabilities } from '../models/camera-capabilities';

export interface CapabilityAdapter {
  getCapabilities(cameraId: string): Promise<CameraCapabilities>;
}
