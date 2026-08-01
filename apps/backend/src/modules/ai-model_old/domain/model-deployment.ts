export interface ModelDeployment {
  id: string;
  modelId: string;
  versionId: string;
  edgeId: string;
  deploymentSlotId: string;
  status: string;
  startedAt: Date;
  stoppedAt?: Date;
}
