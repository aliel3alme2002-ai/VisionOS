import { Notification } from '../domain/notification';

export class NotificationCreatedEvent {
  constructor(
    public readonly notification: Notification,
    public readonly timestamp: Date = new Date()
  ) {}
}
