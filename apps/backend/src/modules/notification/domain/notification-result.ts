export interface NotificationResult {
  notificationId: string;
  success: boolean;
  providerResponse: string;
  deliveredAt?: Date;
}
