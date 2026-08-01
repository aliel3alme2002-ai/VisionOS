import { NotificationChannel } from './notification-channel';

export interface NotificationRecipient {
  id: string;
  userId?: string;
  name: string;
  address: string;
  channel: NotificationChannel;
}
