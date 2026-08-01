import { Alert } from '../domain/alert';

export class AlertRaisedEvent {
  constructor(
    public readonly alert: Alert,
    public readonly timestamp: Date = new Date()
  ) {}
}
