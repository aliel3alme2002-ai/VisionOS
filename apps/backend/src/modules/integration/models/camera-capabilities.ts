export interface CameraCapabilities {
  cameraId: string;
  supportsPtz: boolean;
  supportsAudio: boolean;
  maxResolution: string;
  supportedCodecs: string[];
}
