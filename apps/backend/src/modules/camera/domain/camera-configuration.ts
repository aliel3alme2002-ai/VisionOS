export interface CameraCredentials {
  username?: string;
  password?: string;
  token?: string;
}

export interface CameraConfiguration {
  cameraId: string;
  organizationId: string;
  authentication: string;
  credentials: CameraCredentials;
  rtspUrl: string;
  onvifUrl: string;
  timeouts: number;
  preferredStream: string;
}
