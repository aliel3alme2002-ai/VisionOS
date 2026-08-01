export interface WorkflowContext {
  detectionResultId: string;
  ruleResultId: string;
  cameraId: string;
  edgeId: string;
  modelId: string;
  zoneId?: string;
  organizationId: string;
  variables: Record<string, unknown>;
}
