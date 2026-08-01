export interface DetectionJob {
  id: string;
  cameraId: string;
  streamProfileId: string;
  edgeId: string;
  deploymentSlotId: string;
  modelDeploymentId: string;
  status: string;
  priority: number;
  startedAt: Date;
  finishedAt?: Date;
}
