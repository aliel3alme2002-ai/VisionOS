import { NotificationChannel } from './notification-channel';

export interface NotificationRequest {
  organizationId: string;
  title: string;
  body: string;
  channel: NotificationChannel;
  recipientId: string;
  priority: string;
}
