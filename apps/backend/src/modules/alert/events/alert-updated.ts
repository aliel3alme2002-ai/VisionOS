import { Alert } from '../domain/alert';

export class AlertUpdatedEvent {
  constructor(
    public readonly alert: Alert,
    public readonly timestamp: Date = new Date()
  ) {}
}
