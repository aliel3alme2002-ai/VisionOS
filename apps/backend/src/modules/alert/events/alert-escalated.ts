import { AlertEscalation } from '../domain/alert-escalation';

export class AlertEscalatedEvent {
  constructor(
    public readonly escalation: AlertEscalation,
    public readonly timestamp: Date = new Date()
  ) {}
}
