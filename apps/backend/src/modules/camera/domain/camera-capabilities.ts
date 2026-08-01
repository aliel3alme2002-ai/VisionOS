export interface CameraCapabilities {
  cameraId: string;
  ptz: boolean;
  audio: boolean;
  onvif: boolean;
  rtsp: boolean;
  events: boolean;
  motionDetection: boolean;
}
