export interface NotificationProvider {
  sendNotification(recipientId: string, message: string): Promise<boolean>;
}

export const NOTIFICATION_PROVIDER = Symbol('NOTIFICATION_PROVIDER');
