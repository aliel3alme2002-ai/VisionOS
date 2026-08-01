import { RecordingStatus } from './recording-status';

export interface Recording {
  id: string;
  organizationId: string;
  cameraId: string;
  workflowExecutionId?: string;
  alertId?: string;
  status: RecordingStatus;
  startTime: Date;
  endTime?: Date;
  duration?: number;
  storageLocation?: string;
  checksum?: string;
  size?: number;
  createdAt: Date;
}
