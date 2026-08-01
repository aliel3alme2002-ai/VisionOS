export class NotificationFailedEvent {
  constructor(
    public readonly notificationId: string,
    public readonly error: string,
    public readonly timestamp: Date = new Date()
  ) {}
}
