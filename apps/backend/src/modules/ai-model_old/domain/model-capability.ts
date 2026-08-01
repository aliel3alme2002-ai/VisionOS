export interface ModelCapability {
  personDetection: boolean;
  vehicleDetection: boolean;
  faceDetection: boolean;
  fireDetection: boolean;
  smokeDetection: boolean;
  ppeDetection: boolean;
  poseEstimation: boolean;
  drowningDetection: boolean;
  objectCounting: boolean;
  custom: boolean;
}
