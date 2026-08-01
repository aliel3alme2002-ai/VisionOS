export interface PtzCommand {
  cameraId: string;
  pan?: number;
  tilt?: number;
  zoom?: number;
  speed?: number;
}
