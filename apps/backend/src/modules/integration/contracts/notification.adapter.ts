export interface NotificationAdapter {
  send(recipient: string, message: string): Promise<boolean>;
}
