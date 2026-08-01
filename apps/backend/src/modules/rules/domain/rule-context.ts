export interface RuleContext {
  detectionResultId: string;
  trackedObjectId?: string;
  cameraId: string;
  zoneId?: string;
  modelId: string;
  edgeId: string;
  timestamp: Date;
  organizationId: string;
  variables: Record<string, unknown>;
}
