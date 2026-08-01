import { AlertPriority } from './alert-priority';
import { AlertStatus } from './alert-status';

export interface Alert {
  id: string;
  organizationId: string;
  ruleId?: string;
  workflowExecutionId?: string;
  cameraId?: string;
  edgeId?: string;
  zoneId?: string;
  priority: AlertPriority;
  status: AlertStatus;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
