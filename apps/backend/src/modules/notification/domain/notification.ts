import { NotificationChannel } from './notification-channel';
import { NotificationStatus } from './notification-status';

export interface Notification {
  id: string;
  organizationId: string;
  alertId?: string;
  workflowExecutionId?: string;
  title: string;
  body: string;
  channel: NotificationChannel;
  status: NotificationStatus;
  priority: string;
  scheduledAt?: Date;
  createdAt: Date;
}
