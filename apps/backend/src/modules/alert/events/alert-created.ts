import { Alert } from '../domain/alert';

export class AlertCreatedEvent {
  constructor(
    public readonly alert: Alert,
    public readonly timestamp: Date = new Date()
  ) {}
}
