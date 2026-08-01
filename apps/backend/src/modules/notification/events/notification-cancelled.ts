export class NotificationCancelledEvent {
  constructor(
    public readonly notificationId: string,
    public readonly timestamp: Date = new Date()
  ) {}
}
