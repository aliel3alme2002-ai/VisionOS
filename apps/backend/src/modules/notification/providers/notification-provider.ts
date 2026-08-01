import { Notification } from '../domain/notification';
import { NotificationRecipient } from '../domain/notification-recipient';
import { NotificationResult } from '../domain/notification-result';

export interface NotificationProvider {
  send(notification: Notification, recipient: NotificationRecipient): Promise<NotificationResult>;
}

export const NOTIFICATION_PROVIDER = Symbol('NOTIFICATION_PROVIDER');
