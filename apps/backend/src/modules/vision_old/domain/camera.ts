import { CameraStatus } from '../enums/camera-status';
import { CameraType } from '../enums/camera-type';

export interface CameraCapabilities {
  snapshot: boolean;
  recording: boolean;
  ptz: boolean;
  audio: boolean;
  onvif: boolean;
  rtsp: boolean;
  ai: boolean;
  motionDetection: boolean;
  analytics: boolean;
}

export interface Camera {
  id: string;
  organizationId: string;
  name: string;
  manufacturer: string;
  model: string;
  serialNumber: string;
  ipAddress: string;
  macAddress: string;
  firmware: string;
  type: CameraType;
  status: CameraStatus;
  capabilities: CameraCapabilities;
  createdAt: Date;
  updatedAt: Date;
}
