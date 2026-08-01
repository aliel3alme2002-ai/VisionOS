export interface RecordingRequest {
  organizationId: string;
  cameraId: string;
  workflowExecutionId?: string;
  alertId?: string;
  durationSeconds?: number;
}
